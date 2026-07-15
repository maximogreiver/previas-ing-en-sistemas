import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Lock,
  Unlock,
  CheckCircle,
  Circle,
  Search,
  BookOpen,
  Trophy,
  Star,
  Download,
  Upload,
} from "lucide-react";
import "./App.css";

// Metadata de cada carrera. Las materias se definen dentro del componente.
const CAREER_META = {
  ing: {
    name: "Ingeniería en Sistemas",
    subtitle: "Universidad ORT - Plan 2019 (2485)",
  },
  lic: {
    name: "Licenciatura en Sistemas",
    subtitle: "Universidad ORT",
  },
};

// Clave de localStorage donde se guarda el progreso de una carrera.
const statusKey = (career) => `subjectStatus_${career}`;

// Carga el progreso de una carrera. Migra la clave vieja ("subjectStatus")
// a Ingeniería para no perder el progreso de usuarios existentes.
const loadStatus = (career) => {
  const saved = localStorage.getItem(statusKey(career));
  if (saved) return JSON.parse(saved);
  if (career === "ing") {
    const legacy = localStorage.getItem("subjectStatus");
    if (legacy) return JSON.parse(legacy);
  }
  return {};
};

function App() {
  const [selectedCareer, setSelectedCareer] = useState(
    () => localStorage.getItem("selectedCareer") || "ing",
  );
  const [subjectStatus, setSubjectStatus] = useState(() =>
    loadStatus(localStorage.getItem("selectedCareer") || "ing"),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Al cambiar de carrera: recordar la elección y cargar su progreso.
  useEffect(() => {
    localStorage.setItem("selectedCareer", selectedCareer);
    setSubjectStatus(loadStatus(selectedCareer));
  }, [selectedCareer]);

  // Guardar en localStorage (por carrera) cada vez que cambia el progreso.
  useEffect(() => {
    localStorage.setItem(statusKey(selectedCareer), JSON.stringify(subjectStatus));
  }, [subjectStatus, selectedCareer]);

  const ingenieriaSubjects = useMemo(
    () => [
      // Semestre 1
      {
        id: 2103,
        name: "Álgebra lineal",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 7660,
        name: "Cálculo en una variable",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 1479,
        name: "Programación 1",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 7687,
        name: "Taller de tecnologías 1",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },

      // Semestre 2
      {
        id: 7670,
        name: "Fundamentos de sistemas ciberfísicos",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [7660],
        depsTotal: [],
      },
      {
        id: 6449,
        name: "Fundamentos de computación",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 6580,
        name: "Matemática discreta",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 1743,
        name: "Programación 2",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [1479],
        depsTotal: [],
      },

      // Semestre 3
      {
        id: 3831,
        name: "Arquitectura de sistemas",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 1774,
        name: "Estructuras de datos y algoritmos 1",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [1743, 6449],
        depsTotal: [],
      },
      {
        id: 6563,
        name: "Lógica para computación",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [6449],
        depsTotal: [],
      },
      {
        id: 1780,
        name: "Probabilidad y estadística",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [],
        depsTotal: [2103, 7660],
      },

      // Semestre 4
      {
        id: "mat-ing",
        name: "Materia de Matemática",
        semester: 4,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 7812, name: "Ecuaciones diferenciales", standing: 6, depsPartial: [2103, 7660], depsTotal: [] },
          { id: 7690, name: "Optimización con álgebra lineal", standing: 6, depsPartial: [], depsTotal: [2103, 7660] },
          { id: 7691, name: "Cálculo en varias variables", standing: 6, depsPartial: [7660], depsTotal: [] },
        ],
      },
      {
        id: 3837,
        name: "Bases de datos 1",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [1743],
        depsTotal: [],
      },
      {
        id: 1778,
        name: "Estructuras de datos y algoritmos 2",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [1774, 6580],
        depsTotal: [],
      },
      {
        id: 7669,
        name: "Fundamentos de Ingeniería de software",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [1743],
        depsTotal: [],
      },
      {
        id: 6409,
        name: "Sistemas operativos",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [3831],
        depsTotal: [],
      },

      // Semestre 5
      {
        id: "cs-ing",
        name: "Materia de Ciencias sociales",
        semester: 5,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 1781, name: "Administración general", standing: 9, depsPartial: [], depsTotal: [] },
          { id: 6411, name: "Finanzas y valoración de proyectos", standing: 16, depsPartial: [], depsTotal: [] },
          { id: 7668, name: "Economía y organización empresarial", standing: 9, depsPartial: [], depsTotal: [] },
        ],
      },
      {
        id: 3839,
        name: "Bases de datos 2",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [3837, 6563],
        depsTotal: [],
      },
      {
        id: 3924,
        name: "Diseño de aplicaciones 1",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [3837, 7669],
        depsTotal: [1774],
      },
      {
        id: 3838,
        name: "Redes",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [6409],
        depsTotal: [],
      },
      {
        id: 6452,
        name: "Teoría de la computación",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [1774, 6563],
        depsTotal: [],
      },

      // Semestre 5.5 — Comunicación y negociación exige 2 materias del grupo,
      // repartidas en dos slots (5.5 y 9). Cada opción usa una clave de tracking
      // propia por slot (id) más el código real (code), para que ambos slots
      // sean independientes. Gestión de comunicación, Habilidades gerenciales,
      // Habilidades de equipo y Técnicas de negociación piden además "1 de
      // {ética / inglés / Comunicación y liderazgo} TOTAL"; ética e inglés no
      // están en el plan, así que se modela con Comunicación y liderazgo (7663).
      {
        id: "com-ing-1",
        name: "Materia de Comunicación y negociación (1 de 2)",
        semester: 5.5,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: "c1-7663", code: 7663, name: "Comunicación y liderazgo", standing: 12, depsPartial: [], depsTotal: [] },
          { id: "c1-1410", code: 1410, name: "Recursos humanos", standing: 16, depsPartial: [], depsTotal: [] },
          { id: "c1-5636", code: 5636, name: "Gestión de comunicación, conflictos en proyectos", standing: 16, depsPartial: [7674], depsTotal: [7663] },
          { id: "c1-5733", code: 5733, name: "Habilidades gerenciales en grupos de proyectos", standing: 16, depsPartial: [7674], depsTotal: [7663] },
          { id: "c1-5906", code: 5906, name: "Habilidades de equipo en desarrollo de software", standing: 16, depsPartial: [7674], depsTotal: [7663] },
          { id: "c1-7473", code: 7473, name: "Técnicas de negociación para equipos de proyecto", standing: 16, depsPartial: [7674], depsTotal: [7663] },
        ],
      },

      // Semestre 6
      {
        id: "si-ing",
        name: "Materia de Sistemas inteligentes",
        semester: 6,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 7349, name: "Machine Learning para sistemas inteligentes", standing: 12, depsPartial: [], depsTotal: [1774, 1780] },
          { id: 7678, name: "Machine Learning para análisis de datos", standing: 12, depsPartial: [], depsTotal: [1774, 1780] },
          { id: 7679, name: "Machine Learning para análisis de secuencias", standing: 12, depsPartial: [], depsTotal: [1774, 1780] },
        ],
      },
      {
        id: 6343,
        name: "Diseño de aplicaciones 2",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3924, 7669],
        depsTotal: [],
      },
      {
        id: 7674,
        name: "Ingeniería de software ágil 1",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3924, 7669],
        depsTotal: [],
      },
      {
        id: 6498,
        name: "Programación de redes",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3924, 6409],
        depsTotal: [],
      },
      {
        id: 7688,
        name: "Taller de tecnologías 2",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3838, 3924, 7670],
        depsTotal: [1778, 3837, 7687],
      },

      // Semestre 7
      {
        id: "gi-ing",
        name: "Materia de Gestión de la información",
        semester: 7,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 3437, name: "Web mining", standing: 16, depsPartial: [], depsTotal: [3837] },
          { id: 3842, name: "Bases de datos 3", standing: 16, depsPartial: [3837], depsTotal: [] },
          { id: 7466, name: "Bases de datos no relacionales", standing: 16, depsPartial: [], depsTotal: [3839] },
          { id: 7657, name: "Arquitectura de software para Big Data", standing: 16, depsPartial: [], depsTotal: [3851] },
          { id: 7664, name: "Data mining", standing: 16, depsPartial: [], depsTotal: [3837] },
          { id: 7673, name: "Gobernanza para Big Data", standing: 16, depsPartial: [], depsTotal: [3839] },
          { id: 7692, name: "Fundamentos de Big Data", standing: 16, depsPartial: [], depsTotal: [3839, 3924] },
          { id: 7715, name: "Herramientas de software para Big Data", standing: 16, depsPartial: [3839], depsTotal: [3924, 6409] },
        ],
      },
      {
        id: "seg-ing",
        name: "Materia de Seguridad informática",
        semester: 7,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 4231, name: "Aspectos de seguridad de sistemas informáticos", standing: 16, depsPartial: [], depsTotal: [] },
          { id: 6147, name: "Seguridad en aplicaciones", standing: 16, depsPartial: [], depsTotal: [4231] },
          { id: 7271, name: "Tecnologías aplicadas a la seguridad de la información", standing: 16, depsPartial: [], depsTotal: [4231] },
          { id: 8082, name: "Tópicos avanzados en Seguridad", standing: 12, depsPartial: [], depsTotal: [] },
          { id: 8149, name: "Implementación de seguridad en sistemas de información", standing: 16, depsPartial: [], depsTotal: [4231] },
        ],
      },
      {
        id: 3851,
        name: "Arquitectura de software",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [6343, 6498],
        depsTotal: [1778, 3839],
      },
      {
        id: 7675,
        name: "Ingeniería de software ágil 2",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [6343, 6498, 7674],
        depsTotal: [3924],
      },
      {
        id: 3876,
        name: "Inteligencia artificial",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [1778, 1780, 6563],
        depsTotal: [],
      },

      // Semestre 7.5
      {
        id: "inn-ing",
        name: "Materia de Innovación y emprendedurismo",
        semester: 7.5,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 6852, name: "Emprendimientos dinámicos", standing: 16, depsPartial: [], depsTotal: ["cs-ing"] },
          { id: 6934, name: "Innovación disruptiva", standing: 16, depsPartial: [], depsTotal: ["cs-ing"] },
          { id: 7686, name: "Taller de innovación y emprendedurismo", standing: 16, depsPartial: [], depsTotal: [] },
        ],
      },

      // Semestre 8
      {
        id: "lp-ing",
        name: "Materia de Lenguajes de programación",
        semester: 8,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 1793, name: "Lenguajes y compiladores", standing: 0, depsPartial: [1774, 6563], depsTotal: [] },
          { id: 6030, name: "Tópicos avanzados en algoritmia", standing: 12, depsPartial: [], depsTotal: [1774] },
          { id: 6543, name: "Algoritmos, estructuras de datos y lenguajes avanzados", standing: 16, depsPartial: [], depsTotal: [1778] },
          { id: 7683, name: "Programación y análisis de sistemas paralelos y distribuidos", standing: 16, depsPartial: [], depsTotal: [1774] },
          { id: 8834, name: "Programación funcional avanzada", standing: 16, depsPartial: [1774, 6563], depsTotal: [] },
        ],
      },
      {
        id: "ips-ing",
        name: "Materia de Ingeniería de productos de software",
        semester: 8,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 6933, name: "Desarrollo de aplicaciones escalables en la nube", standing: 16, depsPartial: [], depsTotal: [3851, 7675] },
          { id: 7666, name: "Desarrollo de productos de base tecnológica", standing: 16, depsPartial: [6343, 6498, 7674], depsTotal: [] },
        ],
      },
      {
        id: "nt-ing",
        name: "Materia de Nuevas tecnologías y dominios de aplicación",
        semester: 8,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: 6872, name: "Desarrollo de interfaces de usuario", standing: 16, depsPartial: [], depsTotal: [6343, 7676, "si-ing"] },
          { id: 7667, name: "Diseño centrado en el usuario", standing: 16, depsPartial: [6343, "si-ing"], depsTotal: [] },
          { id: 7676, name: "Interacción humano-computadora", standing: 16, depsPartial: [6343, "si-ing"], depsTotal: [] },
        ],
      },
      {
        id: 6455,
        name: "Arquitectura de software en la práctica",
        semester: 8,
        credits: 1,
        standing: 20,
        depsPartial: [3851, 6498, 7675],
        depsTotal: [],
      },
      {
        id: 6435,
        name: "Trabajo integrador",
        semester: 8,
        credits: 1,
        standing: 20,
        depsPartial: [6343, 6452, 6498, 7674],
        depsTotal: [3839],
      },

      // Semestre 9
      {
        id: "com-ing-2",
        name: "Materia de Comunicación y negociación (2 de 2)",
        semester: 9,
        credits: 1,
        minCount: 1,
        type: "group",
        options: [
          { id: "c2-7663", code: 7663, name: "Comunicación y liderazgo", standing: 12, depsPartial: [], depsTotal: [] },
          { id: "c2-1410", code: 1410, name: "Recursos humanos", standing: 16, depsPartial: [], depsTotal: [] },
          { id: "c2-5636", code: 5636, name: "Gestión de comunicación, conflictos en proyectos", standing: 16, depsPartial: [7674], depsTotal: [7663] },
          { id: "c2-5733", code: 5733, name: "Habilidades gerenciales en grupos de proyectos", standing: 16, depsPartial: [7674], depsTotal: [7663] },
          { id: "c2-5906", code: 5906, name: "Habilidades de equipo en desarrollo de software", standing: 16, depsPartial: [7674], depsTotal: [7663] },
          { id: "c2-7473", code: 7473, name: "Técnicas de negociación para equipos de proyecto", standing: 16, depsPartial: [7674], depsTotal: [7663] },
        ],
      },
      {
        id: "e91",
        name: "Electiva 1",
        semester: 9,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: 1798,
        name: "Proyecto",
        semester: 9,
        credits: 1,
        standing: 30,
        depsPartial: [3851, 3876, 7675],
        depsTotal: [7688, 6435],
      },

      // Semestre 10
      {
        id: "e102",
        name: "Electiva 2",
        semester: 10,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: "e103",
        name: "Electiva 3",
        semester: 10,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
    ],
    [],
  );

  // Plan de la Licenciatura en Sistemas (2491), 4 años. Previas según
  // "Listado de previas" oficial (Dic 25). Las "Materia de ..." y "Electiva N"
  // son huecos electivos sin código: id string y sin previas específicas.
  const licenciaturaSubjects = useMemo(
    () => [
      // Semestre 1
      { id: 1479, name: "Programación 1", semester: 1, credits: 1, standing: 0, depsPartial: [], depsTotal: [] },
      { id: 7687, name: "Taller de tecnologías 1", semester: 1, credits: 1, standing: 0, depsPartial: [], depsTotal: [] },
      { id: 7109, name: "Fundamentos de matemática", semester: 1, credits: 1, standing: 0, depsPartial: [], depsTotal: [] },
      { id: 6402, name: "Administración general", semester: 1, credits: 1, standing: 0, depsPartial: [], depsTotal: [] },

      // Semestre 2
      { id: 1743, name: "Programación 2", semester: 2, credits: 1, standing: 0, depsPartial: [1479], depsTotal: [] },
      { id: 7698, name: "Lógica y Matemática Discreta", semester: 2, credits: 1, standing: 0, depsPartial: [7109], depsTotal: [] },
      { id: 6406, name: "Fundamentos de sistemas de información", semester: 2, credits: 1, standing: 0, depsPartial: [6402], depsTotal: [] },

      // Semestre 3
      { id: 7669, name: "Fundamentos de Ingeniería de software", semester: 3, credits: 1, standing: 2, depsPartial: [1743], depsTotal: [] },
      { id: 3837, name: "Bases de datos 1", semester: 3, credits: 1, standing: 2, depsPartial: [1743], depsTotal: [] },
      { id: 1774, name: "Estructuras de datos y algoritmos 1", semester: 3, credits: 1, standing: 2, depsPartial: [1743, 7698], depsTotal: [] },
      { id: 7680, name: "Marketing, mercados y productos digitales", semester: 3, credits: 1, standing: 2, depsPartial: [], depsTotal: [] },

      // Semestre 3.5
      {
        id: "ao-lic",
        name: "Materia de administración y organizaciones",
        semester: 3.5,
        credits: 1,
        type: "group",
        options: [
          { id: 6417, name: "Comportamiento organizacional", standing: 6, depsPartial: [6402], depsTotal: [] },
          { id: 1417, name: "Derecho de empresa", standing: 16, depsPartial: [], depsTotal: [] },
          { id: 1875, name: "Marketing de servicios", standing: 16, depsPartial: [], depsTotal: [] },
          { id: 1410, name: "Recursos humanos", standing: 16, depsPartial: [], depsTotal: [] },
          { id: 8548, name: "Taller de mejora de procesos de negocio", standing: 4, depsPartial: [], depsTotal: [6402] },
          { id: 7894, name: "Taller de visualización de datos y storytelling", standing: 4, depsPartial: [], depsTotal: [6402] },
        ],
      },

      // Semestre 4
      { id: 3924, name: "Diseño de aplicaciones 1", semester: 4, credits: 1, standing: 6, depsPartial: [1774, 3837, 7669], depsTotal: [] },
      { id: 3839, name: "Bases de datos 2", semester: 4, credits: 1, standing: 6, depsPartial: [3837, 7698], depsTotal: [] },
      { id: 7697, name: "Infraestructura", semester: 4, credits: 1, standing: 6, depsPartial: [1743], depsTotal: [] },
      { id: 3836, name: "Probabilidad y estadística aplicada", semester: 4, credits: 1, standing: 6, depsPartial: [], depsTotal: [7109] },

      // Semestre 4.5
      {
        id: "lnc-lic",
        name: "Materia de Liderazgo, negociación y comunicación",
        semester: 4.5,
        credits: 1,
        type: "group",
        // Habilidades gerenciales y Técnicas de negociación piden además
        // "1 de {ética/inglés/comunicación y liderazgo} TOTAL"; esas materias
        // no están en este plan, así que solo se modela la previa de ISA1.
        options: [
          { id: 7663, name: "Comunicación y liderazgo", standing: 9, depsPartial: [], depsTotal: [] },
          { id: 5733, name: "Habilidades gerenciales en grupos de proyectos", standing: 16, depsPartial: [7674], depsTotal: [] },
          { id: 7473, name: "Técnicas de negociación para equipos de proyecto", standing: 16, depsPartial: [7674], depsTotal: [] },
        ],
      },

      // Semestre 5
      { id: 6343, name: "Diseño de aplicaciones 2", semester: 5, credits: 1, standing: 9, depsPartial: [3924, 7669], depsTotal: [] },
      { id: 3838, name: "Redes", semester: 5, credits: 1, standing: 9, depsPartial: [7697], depsTotal: [] },
      { id: 7681, name: "Métodos cuantitativos para los negocios", semester: 5, credits: 1, standing: 9, depsPartial: [3836], depsTotal: [] },
      { id: 7655, name: "Análisis y diseño funcional", semester: 5, credits: 1, standing: 9, depsPartial: [7669], depsTotal: [] },

      // Semestre 5.5
      { id: 7699, name: "Taller de seguridad informática", semester: 5.5, credits: 1, standing: 12, depsPartial: [], depsTotal: [7697] },

      // Semestre 6
      { id: 7674, name: "Ingeniería de software ágil 1", semester: 6, credits: 1, standing: 12, depsPartial: [3924, 6402, 7669], depsTotal: [] },
      { id: 3842, name: "Bases de datos 3", semester: 6, credits: 1, standing: 12, depsPartial: [3837], depsTotal: [] },
      {
        id: "si-lic",
        name: "Materia de Sistemas inteligentes",
        semester: 6,
        credits: 1,
        type: "group",
        options: [
          { id: 7678, name: "Machine learning para análisis de datos", standing: 12, depsPartial: [], depsTotal: [1774, 3836] },
          { id: 7349, name: "Machine learning para sistemas inteligentes", standing: 12, depsPartial: [], depsTotal: [1774, 3836] },
        ],
      },
      { id: "e1-lic", name: "Electiva 1", semester: 6, credits: 1, standing: 12, depsPartial: [], depsTotal: [], type: "elective" },
      { id: 6498, name: "Programación de redes", semester: 6, credits: 1, standing: 12, depsPartial: [3924, 7697], depsTotal: [] },

      // Semestre 7
      { id: "e2-lic", name: "Electiva 2", semester: 7, credits: 1, standing: 16, depsPartial: [], depsTotal: [], type: "elective" },
      {
        id: "ips-lic",
        name: "Materia de Ingeniería de productos de software",
        semester: 7,
        credits: 1,
        type: "group",
        options: [
          { id: 3851, name: "Arquitectura de software", standing: 16, depsPartial: [6343, 6498], depsTotal: [1774, 3839] },
          { id: 6455, name: "Arquitectura de software en la práctica", standing: 16, depsPartial: [3851, 6498, 7675, "si-lic"], depsTotal: [] },
          { id: 7666, name: "Desarrollo de productos de base tecnológica", standing: 16, depsPartial: [6343, 6498, 7674], depsTotal: [] },
          { id: 7667, name: "Diseño centrado en el usuario", standing: 16, depsPartial: [6343, "si-lic"], depsTotal: [] },
          { id: 7675, name: "Ingeniería de software ágil 2", standing: 16, depsPartial: [3924, 6343, 6498, 7674], depsTotal: [] },
          { id: 7676, name: "Interacción humano-computadora", standing: 16, depsPartial: [6343, "si-lic"], depsTotal: [] },
        ],
      },
      {
        id: "gi-lic",
        name: "Materia de Gestión de la información",
        semester: 7,
        credits: 1,
        type: "group",
        options: [
          { id: 7715, name: "Herramientas de software para Big Data", standing: 16, depsPartial: [3839, 3924], depsTotal: [7697] },
          { id: 7664, name: "Data mining", standing: 16, depsPartial: [], depsTotal: [3837] },
        ],
      },
      { id: 7658, name: "Arquitecturas empresariales", semester: 7, credits: 1, standing: 16, depsPartial: [7655], depsTotal: [] },
      { id: 6411, name: "Finanzas y valoración de proyectos", semester: 7, credits: 1, standing: 16, depsPartial: [], depsTotal: [] },

      // Semestre 7.5
      {
        id: "ie-lic",
        name: "Materia de Innovación y emprendedorismo",
        semester: 7.5,
        credits: 1,
        type: "group",
        options: [
          { id: 6852, name: "Emprendimientos dinámicos", standing: 16, depsPartial: [], depsTotal: [6402] },
          { id: 7686, name: "Taller de innovación y emprendedurismo", standing: 16, depsPartial: [], depsTotal: [] },
        ],
      },

      // Semestre 8
      { id: 3861, name: "Proyecto", semester: 8, credits: 1, standing: 20, depsPartial: [6343, 6498, 7674], depsTotal: [3839, 7655] },
      { id: "e3-lic", name: "Electiva 3", semester: 8, credits: 1, standing: 20, depsPartial: [], depsTotal: [], type: "elective" },
      { id: 3856, name: "Sistemas de soporte de decisión", semester: 8, credits: 1, standing: 20, depsPartial: ["si-lic"], depsTotal: [] },
      { id: 6415, name: "Estrategia de negocios", semester: 8, credits: 1, standing: 20, depsPartial: [], depsTotal: [] },
    ],
    [],
  );

  const subjects = useMemo(
    () => (selectedCareer === "lic" ? licenciaturaSubjects : ingenieriaSubjects),
    [selectedCareer, ingenieriaSubjects, licenciaturaSubjects],
  );

  // Un grupo electivo ("elegí una") es una entrada con type "group" y options.
  // Mapa de grupos por id, para resolver previas que apuntan a un grupo.
  const groupsById = useMemo(() => {
    const m = {};
    for (const s of subjects) if (s.type === "group") m[s.id] = s;
    return m;
  }, [subjects]);

  // Nombre por id/código, cubriendo materias, grupos y opciones. Una opción
  // tiene una clave de tracking (id) y un código real (code, por defecto id);
  // se indexan ambos para poder mostrar previas que apuntan al código.
  const nameById = useMemo(() => {
    const m = {};
    for (const s of subjects) {
      m[s.id] = s.name;
      if (s.type === "group")
        for (const o of s.options) {
          m[o.id] = o.name;
          m[o.code ?? o.id] = o.name;
        }
    }
    return m;
  }, [subjects]);

  // Estado efectivo de una entrada. Un grupo requiere aprobar minCount opciones
  // (por defecto 1): "total" si hay al menos minCount opciones totales,
  // "partial" si hay alguna opción marcada, si no undefined.
  const entryStatus = useCallback(
    (entry) => {
      if (entry.type === "group") {
        const min = entry.minCount || 1;
        let totals = 0;
        let marked = 0;
        for (const opt of entry.options) {
          const st = subjectStatus[opt.id];
          if (st === "total") totals++;
          if (st) marked++;
        }
        if (totals >= min) return "total";
        if (marked >= 1) return "partial";
        return undefined;
      }
      return subjectStatus[entry.id];
    },
    [subjectStatus],
  );

  // Unidades de una entrada, para créditos y estadísticas ponderadas. Un grupo
  // aporta minCount unidades (cada materia = 1 crédito); done/part cuentan las
  // opciones aprobadas/en curso, topeadas al mínimo requerido.
  const entryUnits = useCallback(
    (entry) => {
      if (entry.type === "group") {
        const weight = entry.minCount || 1;
        let totals = 0;
        let marked = 0;
        for (const opt of entry.options) {
          const st = subjectStatus[opt.id];
          if (st === "total") totals++;
          if (st) marked++;
        }
        const done = Math.min(totals, weight);
        const part = Math.min(marked - totals, weight - done);
        return { weight, done, part };
      }
      const st = subjectStatus[entry.id];
      return {
        weight: 1,
        done: st === "total" ? 1 : 0,
        part: st === "partial" ? 1 : 0,
      };
    },
    [subjectStatus],
  );

  // Estado agregado por código de materia. Una misma materia puede figurar como
  // opción en más de un slot (p. ej. Comunicación en 5.5 y 9); acá se combina:
  // "total" si algún slot la tiene total, "partial" si alguno la tiene marcada.
  const statusByCode = useMemo(() => {
    const m = {};
    const put = (code, st) => {
      if (!st || m[code] === "total") return;
      m[code] = st === "total" ? "total" : m[code] || "partial";
    };
    for (const s of subjects) {
      if (s.type === "group")
        for (const o of s.options) put(o.code ?? o.id, subjectStatus[o.id]);
      else put(s.id, subjectStatus[s.id]);
    }
    return m;
  }, [subjects, subjectStatus]);

  // Estado de una previa por id. Puede apuntar a un grupo o a un código.
  const statusOf = useCallback(
    (id) => {
      const grp = groupsById[id];
      if (grp) return entryStatus(grp);
      return statusByCode[id];
    },
    [groupsById, entryStatus, statusByCode],
  );

  const getTotalCredits = useCallback(() => {
    return subjects.reduce((total, entry) => {
      const { done, part } = entryUnits(entry);
      return total + done + part;
    }, 0);
  }, [subjects, entryUnits]);

  // Cicla el estado de una materia u opción: sin marcar → parcial → total → sin
  // marcar. Dentro de un grupo solo puede haber una opción marcada, así que al
  // empezar a marcar una se limpian las hermanas (siblings).
  const toggleSubject = (id, siblings = []) => {
    setSubjectStatus((prev) => {
      const current = prev[id];
      const newStatus = { ...prev };

      if (!current) {
        for (const sid of siblings) delete newStatus[sid];
        newStatus[id] = "partial";
      } else if (current === "partial") {
        newStatus[id] = "total";
      } else {
        delete newStatus[id];
      }

      return newStatus;
    });
  };

  // ¿Se cumplen los requisitos (standing + previas) de una materia u opción?
  const meetsRequisites = useCallback(
    (item, totalCredits) => {
      if (totalCredits < item.standing) return false;
      for (const depId of item.depsPartial) {
        if (!statusOf(depId)) return false;
      }
      for (const depId of item.depsTotal) {
        if (statusOf(depId) !== "total") return false;
      }
      return true;
    },
    [statusOf],
  );

  // Una opción de grupo está disponible según sus propios requisitos.
  const isOptionUnlocked = useCallback(
    (option) => meetsRequisites(option, getTotalCredits()),
    [meetsRequisites, getTotalCredits],
  );

  // Una entrada está disponible: la materia por sus requisitos; un grupo si
  // al menos una de sus opciones está disponible.
  const isUnlocked = useCallback(
    (entry) => {
      const totalCredits = getTotalCredits();
      if (entry.type === "group") {
        return entry.options.some((opt) => meetsRequisites(opt, totalCredits));
      }
      return meetsRequisites(entry, totalCredits);
    },
    [getTotalCredits, meetsRequisites],
  );

  const getSubjectDisplayStatus = useCallback(
    (entry) => {
      const status = entryStatus(entry);
      if (status) return status;
      if (isUnlocked(entry)) return "unlocked";
      return "locked";
    },
    [entryStatus, isUnlocked],
  );

  const exportProgress = () => {
    const data = JSON.stringify(subjectStatus, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progreso-${selectedCareer}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const importProgress = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setSubjectStatus(data);
        alert("¡Progreso importado exitosamente!");
      } catch (error) {
        alert("Error al importar el archivo");
      }
    };
    reader.readAsText(file);
  };

  const resetProgress = () => {
    if (
      window.confirm("¿Estás seguro de que querés borrar todo el progreso?")
    ) {
      setSubjectStatus({});
      localStorage.removeItem(statusKey(selectedCareer));
    }
  };

  const filteredSubjects = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return subjects.filter((entry) => {
      const names =
        entry.type === "group"
          ? [entry.name, ...entry.options.map((o) => o.name)]
          : [entry.name];
      const matchesSearch = names.some((n) => n.toLowerCase().includes(term));
      const displayStatus = getSubjectDisplayStatus(entry);

      if (filterStatus === "all") return matchesSearch;
      if (filterStatus === "unlocked")
        return matchesSearch && displayStatus === "unlocked";
      if (filterStatus === "locked")
        return matchesSearch && displayStatus === "locked";
      return (
        matchesSearch &&
        (displayStatus === "partial" || displayStatus === "total")
      );
    });
  }, [subjects, searchTerm, filterStatus, getSubjectDisplayStatus]);

  const groupedSubjects = useMemo(() => {
    const groups = {};
    filteredSubjects.forEach((subject) => {
      const key = `Semestre ${subject.semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(subject);
    });
    return groups;
  }, [filteredSubjects]);

  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;
    let partial = 0;
    let unlocked = 0;
    for (const entry of subjects) {
      const { weight, done, part } = entryUnits(entry);
      total += weight;
      completed += done;
      partial += part;
      const remaining = weight - done - part;
      if (remaining > 0 && isUnlocked(entry)) unlocked += remaining;
    }
    const locked = total - completed - partial - unlocked;
    const totalCredits = getTotalCredits();
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      partial,
      unlocked,
      locked,
      totalCredits,
      progress,
    };
  }, [subjects, entryUnits, getTotalCredits, isUnlocked]);

  // Bloque de requisitos (standing + previas) de una materia u opción.
  const renderReqs = (item, totalCredits) => {
    if (
      !(
        item.depsPartial.length > 0 ||
        item.depsTotal.length > 0 ||
        item.standing > 0
      )
    )
      return null;
    return (
      <div className="text-xs text-indigo-200 mt-2 pt-2 border-t border-white/20 space-y-1">
        {item.standing > 0 && (
          <div
            className={
              totalCredits >= item.standing ? "text-green-300" : "text-red-300"
            }
          >
            📊 Requiere {item.standing} créditos totales
          </div>
        )}
        {item.depsTotal.length > 0 && (
          <div>
            <strong>Total:</strong>{" "}
            {item.depsTotal.map((d) => nameById[d] || d).join(", ")}
          </div>
        )}
        {item.depsPartial.length > 0 && (
          <div>
            <strong>Parcial:</strong>{" "}
            {item.depsPartial.map((d) => nameById[d] || d).join(", ")}
          </div>
        )}
      </div>
    );
  };

  // Tarjeta de una materia normal o de una opción de grupo (isOption).
  // siblings: claves de las otras opciones del grupo (para exclusividad).
  const renderCard = (item, isOption = false, siblings = []) => {
    const status = subjectStatus[item.id];
    const code = item.code ?? item.id;
    const displayStatus = isOption
      ? status || (isOptionUnlocked(item) ? "unlocked" : "locked")
      : getSubjectDisplayStatus(item);
    const isComplete = status === "total";
    const isPartial = status === "partial";
    const isAvailable = displayStatus === "unlocked";
    const isLocked = displayStatus === "locked";
    const totalCredits = getTotalCredits();

    return (
      <button
        key={item.id}
        onClick={() => toggleSubject(item.id, siblings)}
        disabled={isLocked && !status}
        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
          isComplete
            ? "bg-green-500/30 border-green-400 hover:bg-green-500/40"
            : isPartial
              ? "bg-yellow-500/30 border-yellow-400 hover:bg-yellow-500/40"
              : isAvailable
                ? "bg-blue-500/20 border-blue-400 hover:bg-blue-500/30 hover:scale-105"
                : "bg-red-500/10 border-red-400/50 opacity-60 cursor-not-allowed"
        }`}
      >
        {!isOption && item.type === "elective" && (
          <div className="absolute top-2 right-2 bg-purple-500/40 text-purple-200 text-xs px-2 py-1 rounded">
            Electiva
          </div>
        )}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <div className="text-white font-semibold mb-1 leading-tight">
              {item.name}
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <div className="text-xs text-indigo-200">
                {typeof code === "string" && code.startsWith("e")
                  ? "A elección"
                  : typeof code === "string"
                    ? "Genérica"
                    : `ID: ${code}`}
              </div>
              {!isOption && item.credits > 0 && (
                <div className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-0.5 rounded">
                  {item.credits} crédito
                </div>
              )}
            </div>
          </div>
          <div className="ml-2 flex-shrink-0">
            {isComplete ? (
              <CheckCircle className="text-green-300" size={24} />
            ) : isPartial ? (
              <Circle className="text-yellow-300" size={24} />
            ) : isAvailable ? (
              <Unlock className="text-blue-300" size={24} />
            ) : (
              <Lock className="text-red-300" size={24} />
            )}
          </div>
        </div>
        {renderReqs(item, totalCredits)}
      </button>
    );
  };

  // Tarjeta de un grupo electivo: título + opciones ("elegí N").
  const renderGroupCard = (group) => {
    const min = group.minCount || 1;
    const totals = group.options.filter(
      (o) => subjectStatus[o.id] === "total",
    ).length;
    const marked = group.options.filter((o) => subjectStatus[o.id]).length;
    const credits = group.credits ?? min;
    return (
      <div
        key={group.id}
        className="md:col-span-2 lg:col-span-3 p-4 rounded-xl border-2 border-purple-400/50 bg-purple-500/10"
      >
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-white font-semibold">{group.name}</span>
          <span className="text-xs bg-purple-500/40 text-purple-200 px-2 py-1 rounded">
            Elegí {min}
          </span>
          {credits > 0 && (
            <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-0.5 rounded">
              {credits} crédito{credits > 1 ? "s" : ""}
            </span>
          )}
          <span className="ml-auto text-xs text-indigo-200">
            {marked > 0
              ? `${totals}/${min} aprobada${min > 1 ? "s" : ""}`
              : `${group.options.length} opciones`}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {group.options.map((opt) =>
            renderCard(
              opt,
              true,
              group.options.filter((o) => o.id !== opt.id).map((o) => o.id),
            ),
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {CAREER_META[selectedCareer].name}
              </h1>
              <p className="text-indigo-200">
                {CAREER_META[selectedCareer].subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="career-select" className="sr-only">
                Elegir carrera
              </label>
              <select
                id="career-select"
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                aria-label="Elegir carrera"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              >
                {Object.entries(CAREER_META).map(([id, meta]) => (
                  <option key={id} value={id} className="text-slate-900">
                    {meta.name}
                  </option>
                ))}
              </select>
              <Trophy className="text-yellow-400" size={48} />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm text-indigo-200 mb-1">
              <span>Progreso de la carrera</span>
              <span className="font-bold text-white">{stats.progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-yellow-300">
              <Star className="fill-yellow-300" size={20} />
              <span className="font-bold text-lg">
                {stats.totalCredits} créditos
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={exportProgress}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                <Download size={18} />
                Exportar
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition cursor-pointer">
                <Upload size={18} />
                Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={importProgress}
                  className="hidden"
                />
              </label>
              <button
                onClick={resetProgress}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-3 border border-green-400/30">
            <div className="text-green-300 text-xs mb-1">✅ Total</div>
            <div className="text-2xl font-bold text-white">
              {stats.completed}
            </div>
          </div>
          <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-3 border border-yellow-400/30">
            <div className="text-yellow-300 text-xs mb-1">⏳ Parcial</div>
            <div className="text-2xl font-bold text-white">{stats.partial}</div>
          </div>
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-3 border border-blue-400/30">
            <div className="text-blue-300 text-xs mb-1">🔓 Disponibles</div>
            <div className="text-2xl font-bold text-white">
              {stats.unlocked}
            </div>
          </div>
          <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-3 border border-red-400/30">
            <div className="text-red-300 text-xs mb-1">🔒 Bloqueadas</div>
            <div className="text-2xl font-bold text-white">{stats.locked}</div>
          </div>
          <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-3 border border-purple-400/30">
            <div className="text-purple-300 text-xs mb-1">📚 Total</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-indigo-300"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar materia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar materia"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "all"
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-indigo-200 hover:bg-white/20"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "completed"
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-green-200 hover:bg-white/20"
                }`}
              >
                Aprobadas
              </button>
              <button
                onClick={() => setFilterStatus("unlocked")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "unlocked"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-blue-200 hover:bg-white/20"
                }`}
              >
                Disponibles
              </button>
              <button
                onClick={() => setFilterStatus("locked")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "locked"
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-red-200 hover:bg-white/20"
                }`}
              >
                Bloqueadas
              </button>
            </div>
          </div>
        </div>

        {/* Subjects by semester */}
        <div className="space-y-6">
          {Object.entries(groupedSubjects)
            .sort(([a], [b]) => {
              const semA = parseFloat(a.split(" ")[1]);
              const semB = parseFloat(b.split(" ")[1]);
              return semA - semB;
            })
            .map(([semester, subjectList]) => (
              <div
                key={semester}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-indigo-300" size={24} />
                  <h2 className="text-2xl font-bold text-white">{semester}</h2>
                  <span className="ml-auto text-indigo-300 text-sm">
                    {subjectList.filter((s) => entryStatus(s)).length}/
                    {subjectList.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjectList.map((entry) =>
                    entry.type === "group"
                      ? renderGroupCard(entry)
                      : renderCard(entry),
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-3">💡 Cómo usar</h3>
          <div className="grid md:grid-cols-2 gap-4 text-indigo-200 text-sm">
            <div className="space-y-2">
              <p>
                🟢 <strong className="text-green-300">Verde</strong>: Crédito
                TOTAL{" "}
              </p>
              <p>
                🟡 <strong className="text-yellow-300">Amarillo</strong>:
                Crédito PARCIAL{" "}
              </p>
              <p>
                🔵 <strong className="text-blue-300">Azul</strong>: Disponible
                para cursar ahora
              </p>
              <p>
                🔴 <strong className="text-red-300">Rojo</strong>: Bloqueada
                (faltan requisitos)
              </p>
            </div>
            <div className="space-y-2">
              <p>
                ✨ <strong>1er click</strong>: Marca como PARCIAL
              </p>
              <p>
                ✨ <strong>2do click</strong>: Marca como TOTAL (suma créditos)
              </p>
              <p>
                ✨ <strong>3er click</strong>: Desmarca la materia
              </p>
              <p>
                🟣 <strong className="text-purple-300">Grupo electiva</strong>:
                elegí y marcá 1 de las opciones (cuenta 1 crédito)
              </p>
              <p>💾 Tu progreso se guarda automáticamente en tu navegador</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
