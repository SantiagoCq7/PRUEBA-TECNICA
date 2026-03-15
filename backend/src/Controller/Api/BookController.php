<?php

namespace App\Controller\Api;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/books', name: 'api_books_', methods: ['GET'])]
class BookController extends AbstractController
{
    #[Route('', name: 'list')]
    public function list(BookRepository $bookRepository): JsonResponse
    {
        return $this->json($bookRepository->findAllWithAverageRating());
    }
}