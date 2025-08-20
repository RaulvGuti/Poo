export class Book {
  title: string;
  description: string;
  author: string;

  private constructor(title: string, description: string, author: string) {
    this.title = title;
    this.description = description;
    this.author = author;
  }

  static create(title: any, description: any, author: any) {
    if (typeof title !== "string" || typeof description !== "string" || typeof author !== "string") {
      throw new Error("El título, la descripción y el autor deben ser textos.");
    }

    let cleanTitle = title.trim();
    let cleanAuthor = author.trim();
    let cleanDescription = description.trim();

    cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    cleanAuthor = cleanAuthor.charAt(0).toUpperCase() + cleanAuthor.slice(1);

    if (!cleanTitle.endsWith(".")) cleanTitle += ".";
    if (!cleanAuthor.endsWith(".")) cleanAuthor += ".";

    return new Book(cleanTitle, cleanDescription, cleanAuthor);
  }
}
