<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Book>
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    /**
     * @return list<array{id: int, title: string, author: string, published_year: int, average_rating: float|null}>
     */
    public function findAllWithAverageRating(): array
    {
        $rows = $this->createQueryBuilder('book')
            ->select('book.id AS id')
            ->addSelect('book.title AS title')
            ->addSelect('book.author AS author')
            ->addSelect('book.publishedYear AS published_year')
            ->addSelect('AVG(review.rating) AS average_rating')
            ->leftJoin('book.reviews', 'review')
            ->groupBy('book.id')
            ->orderBy('book.title', 'ASC')
            ->getQuery()
            ->getArrayResult();

        return array_map(static function (array $row): array {
            return [
                'id' => (int) $row['id'],
                'title' => (string) $row['title'],
                'author' => (string) $row['author'],
                'published_year' => (int) $row['published_year'],
                'average_rating' => $row['average_rating'] === null ? null : round((float) $row['average_rating'], 2),
            ];
        }, $rows);
    }
}