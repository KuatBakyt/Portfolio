import { FaLaptopCode, FaReact } from "react-icons/fa";

export const projects = [
  {
    name: "Project Manager",
    description: "Project Manager — веб‑приложение на React + TypeScript для управления проектами и задачами с современным UI.",
    technologies: "React, Redux-Toolkit, TypeScript",
    link: "https://github.com/KuatBakyt/project-manager",
  },
  {
    name: "project",
    description: "Учебный проект на PHP, демонстрация базовой серверной логики.",
    technologies: "PHP, mySQL",
    link: "https://github.com/KuatBakyt/project",
  },
  {
    name: "travelApp",
    description: "Приложение для планирования поездок, ориентированное на удобный UI.",
    technologies: "React, JSON",
    link: "https://github.com/KuatBakyt/travelApp",
  },
  {
    name: "travelsProject",
    description: "Веб‑приложение для управления путешествиями, включает фронтенд и бэкенд.",
    technologies: "React, Redux, Python(django)",
    link: "https://github.com/KuatBakyt/travelsProject",
  },
];

export const jobs = [
    {
      company: "Solva Technology Ltd.",
      period: "Май 2025 – Ноябрь 2025 (7 месяцев)",
      role: "Frontend-разработчик",
      description: [
        "Разрабатывал интерфейсы с использованием ReactJS + TypeScript (формы заявок, CRM-модули).",
        "Настраивал интеграцию с REST API, реализовывал обработку ошибок.",
        "Проводил unit-тестирование компонентов и поддерживал качество кода.",
      ],
      icon: <FaLaptopCode className="icon" />,
    },
    {
      company: "OneCredit",
      period: "Январь 2022 – Декабрь 2023 (2 года)",
      role: "Frontend-разработчик",
      description: [
        "Разработка и поддержка клиентской части веб-приложений (HTML, CSS, JavaScript, React).",
        "Рефакторинг и оптимизация кода, исправление ошибок и проблем с производительностью.",
        "Совместная работа в Scrum-команде: Jira, планирование спринтов, code review.",
        "Эффективное взаимодействие с дизайнерами и backend-разработчиками.",
      ],
      icon: <FaReact className="icon" />,
    },
  ];