<?php

// анти-бот
if (!empty($_POST['website'])) {
  exit;
}

// данные
$name = htmlspecialchars($_POST['name'] ?? '');
$company = htmlspecialchars($_POST['company'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$phone = htmlspecialchars($_POST['phone'] ?? '');
$city = htmlspecialchars($_POST['city'] ?? '');

// куда отправлять
$to = "info@pharmaelement.com";

// тема
$subject = "Заявка с сайта perchiq.ru";

// текст письма
$message = "Новая заявка:\n\n";
$message .= "Имя: $name\n";
$message .= "Компания: $company\n";
$message .= "Email: $email\n";
$message .= "Телефон: $phone\n";
$message .= "Город: $city\n";

// заголовки
$headers = [];
$headers[] = "From: Perchiq <no-reply@perchiq.ru>";
$headers[] = "Reply-To: $email";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// отправка
if (mail($to, $subject, $message, implode("\r\n", $headers))) {
  echo "ok";
} else {
  echo "error";
}