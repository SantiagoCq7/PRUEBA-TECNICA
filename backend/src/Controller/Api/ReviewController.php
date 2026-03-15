<?php

namespace App\Controller\Api;

use App\Dto\CreateReviewInput;
use App\Entity\Review;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/reviews', name: 'api_reviews_', methods: ['POST'])]
class ReviewController extends AbstractController
{
    #[Route('', name: 'create')]
    public function create(
        Request $request,
        ValidatorInterface $validator,
        BookRepository $bookRepository,
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        try {
            $payload = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            return $this->json([
                'message' => 'El cuerpo JSON no es valido.',
            ], 400);
        }

        if (!is_array($payload)) {
            return $this->json([
                'message' => 'El cuerpo JSON no es valido.',
            ], 400);
        }

        $input = new CreateReviewInput();
        $input->book_id = $payload['book_id'] ?? null;
        $input->rating = $payload['rating'] ?? null;
        $input->comment = $payload['comment'] ?? null;

        $violations = $validator->validate($input);
        if (count($violations) > 0) {
            return $this->validationErrorResponse($violations);
        }

        $book = $bookRepository->find((int) $input->book_id);
        if ($book === null) {
            return $this->json([
                'message' => 'La validacion ha fallado.',
                'errors' => [
                    'book_id' => ['El libro seleccionado no existe.'],
                ],
            ], 400);
        }

        $review = (new Review())
            ->setBook($book)
            ->setRating((int) $input->rating)
            ->setComment(trim((string) $input->comment));

        $entityManager->persist($review);
        $entityManager->flush();

        return $this->json([
            'id' => $review->getId(),
            'book_id' => $book->getId(),
            'rating' => $review->getRating(),
            'comment' => $review->getComment(),
            'created_at' => $review->getCreatedAt()?->format(DATE_ATOM),
        ], 201);
    }

    private function validationErrorResponse(ConstraintViolationListInterface $violations): JsonResponse
    {
        $errors = [];

        foreach ($violations as $violation) {
            $field = $violation->getPropertyPath();
            $errors[$field][] = $violation->getMessage();
        }

        return $this->json([
            'message' => 'La validacion ha fallado.',
            'errors' => $errors,
        ], 400);
    }
}