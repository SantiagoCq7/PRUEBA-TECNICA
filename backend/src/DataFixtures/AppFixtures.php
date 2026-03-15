<?php

namespace App\DataFixtures;

use App\Entity\Book;
use App\Entity\Review;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $book1 = (new Book())
            ->setTitle('El Arte de Programar')
            ->setAuthor('Donald Knuth')
            ->setPublishedYear(1968);

        $book2 = (new Book())
            ->setTitle('Clean Code')
            ->setAuthor('Robert C. Martin')
            ->setPublishedYear(2008);

        $book3 = (new Book())
            ->setTitle('Refactoring')
            ->setAuthor('Martin Fowler')
            ->setPublishedYear(1999);

        $books = [$book1, $book2, $book3];
        foreach ($books as $book) {
            $manager->persist($book);
        }

        $reviews = [
            [$book1, 5, 'Un clasico imprescindible para profundizar en algoritmos.'],
            [$book1, 4, 'Denso pero extremadamente valioso para bases solidas.'],
            [$book2, 5, 'Muy practico para mejorar la legibilidad del codigo.'],
            [$book2, 3, 'Buen material, aunque algunas partes son debatibles hoy.'],
            [$book3, 4, 'Excelente guia para refactorizar con criterio.'],
            [$book3, 2, 'Util, pero requiere contexto para aprovecharlo mejor.'],
        ];

        foreach ($reviews as [$book, $rating, $comment]) {
            $review = (new Review())
                ->setBook($book)
                ->setRating($rating)
                ->setComment($comment);

            $manager->persist($review);
        }

        $manager->flush();
    }
}
