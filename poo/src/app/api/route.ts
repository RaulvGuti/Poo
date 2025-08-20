import { NextResponse, NextRequest } from "next/server";
import postgres from "postgres";

// No entendi bien el paso 2 pense que validar era get, hasta que un compañero me explico ahorita si ya esta validacion y nivel de abstraccion
const connectionString =
  "postgresql://postgres.hbninqtzxwmjeyfgccjr:Pollito14@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
const sql = postgres(connectionString);

// Creamos el constructor del libro
class Book {
  title: string;
  description: string;
  author: string;

  private constructor(title: string, description: string, author: string) {
    this.title = title;
    this.description = description;
    this.author = author;
  }

  // Se asegura que sera Varchar y reinicia
  static create(title: any, description: any, author: any) {
    if (typeof title !== "string" || typeof description !== "string" || typeof author !== "string") {
      throw new Error("El título, la descripción y el autor deben ser textos.");
    }

    // Quita espacios que se vayan demas
    let cleanTitle = title.trim();
    let cleanAuthor = author.trim();
    let cleanDescription = description.trim();

    // Hacer que la letra inicial sea mayuscula si o si
    cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    cleanAuthor = cleanAuthor.charAt(0).toUpperCase() + cleanAuthor.slice(1);

    // Poner un punto final si o si
    if (!cleanTitle.endsWith(".")) cleanTitle += ".";
    if (!cleanAuthor.endsWith(".")) cleanAuthor += ".";

    return new Book(cleanTitle, cleanDescription, cleanAuthor);
  }
}

// Nuevo repositorio para reducir acoplamiento directo con la base de datos
class BookRepository {
  private db: any;
  constructor(db: any) {
    this.db = db;
  }

  async findAll() {
    const rows = await this.db`SELECT title, description, author FROM post`;
    return rows;
  }

  async insert(book: Book) {
    await this.db`
      INSERT INTO post (title, description, author)
      VALUES (${book.title}, ${book.description}, ${book.author})
    `;
  }
}

// Esto añade a una funcion especifica para seleccionar libros libros
class BookService {
  private repository: BookRepository;

  constructor(repository: BookRepository) {
    this.repository = repository;
  }

  async getAllBooks() {
    const rows = await this.repository.findAll();
    return rows.map((row: any) => Book.create(row.title, row.description, row.author));
  }

  // Añade la funciona para incluir un libro
  async addBook(book: Book) {
    await this.repository.insert(book);
    return book;
  }
}

const bookRepository = new BookRepository(sql);
const bookService = new BookService(bookRepository);

export async function GET() {
  try {
    const requisitos = await bookService.getAllBooks();

    return NextResponse.json({
      message: "Libros obtenidos correctamente",
      requisitos,
    });
  } catch (error: any) {
    console.error("Error al obtener libros:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "No se pudieron obtener los libros" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, author } = body;

    if (!title || !description || !author) {
      return NextResponse.json(
        { error: "Por favor llena todos los campos" },
        { status: 422 }
      );
    }

    let book; // Esto se asegura de validaciones (Paso 2 tecnicamente jaja)
    try {
      book = Book.create(title, description, author);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }

    await bookService.addBook(book);

    return NextResponse.json({
      message: "Libro agregado correctamente",
      nuevoPost: book,
    });
  } catch (error: any) {
    console.error("Error al crear el libro:", error.message);
    return NextResponse.json(
      { error: "Ocurrio un problema al guardar tu libro" },
      { status: 500 }
    );
  }
}
