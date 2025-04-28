-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2025 at 04:40 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `praktyki`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyzwania`
--

CREATE TABLE `wyzwania` (
  `id` int(11) NOT NULL,
  `wyzwanie` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wyzwania`
--

INSERT INTO `wyzwania` (`id`, `wyzwanie`) VALUES
(1, 'Zrób dziesięć pompek'),
(2, 'Spędź godzine bez telefonu'),
(3, 'Zrób dobry uczynek'),
(4, 'Posprzątaj pokój'),
(5, 'Przeczytaj 20 stron książki'),
(6, 'Pójdź na spacer'),
(7, 'Medytuj przez 10 minut'),
(8, 'Zrób 20 przysiadów'),
(9, 'Zrób sobie minutę ciszy'),
(10, 'Zrób porządek na pulpicie komputera'),
(11, 'Zrób coś co od dawna odkładałeś'),
(12, 'Zrób 20 brzuszków'),
(13, 'Zrób obiad dla całej rodziny'),
(14, 'Zrób 30 pajacyków'),
(15, 'Wypij szklankę wody'),
(16, 'Zjedz coś zdrowego'),
(17, 'Wypisz co dzisiaj będziesz robić'),
(18, 'Naucz się jednego zdania w innym języku'),
(19, 'Zmień tapetę na pulpicie'),
(20, 'Narysuj coś');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `wyzwania`
--
ALTER TABLE `wyzwania`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
