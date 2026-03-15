<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class CreateReviewInput
{
    #[Assert\NotNull(message: 'book_id es obligatorio.')]
    #[Assert\Type(type: 'integer', message: 'book_id debe ser un numero entero.')]
    public mixed $book_id = null;

    #[Assert\NotNull(message: 'rating es obligatorio.')]
    #[Assert\Type(type: 'integer', message: 'rating debe ser un numero entero.')]
    #[Assert\Range(min: 1, max: 5, notInRangeMessage: 'rating debe estar entre 1 y 5.')]
    public mixed $rating = null;

    #[Assert\NotBlank(message: 'comment no puede estar vacio.')]
    #[Assert\Type(type: 'string', message: 'comment debe ser una cadena de texto.')]
    public mixed $comment = null;
}