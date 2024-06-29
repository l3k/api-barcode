import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";
import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

class ProductToPdfUseCase {
  async execute() {
    try {
      const doc = new jsPDF();
      const tmpFolder = path.resolve(__dirname, '..', '..', '..', '..', 'tmp');
      const products = await client.product.findMany({
        orderBy: {
          name: 'asc'
        }
      });

      doc.text('Produtos', 10, 20);
      doc.setFontSize(10);

      let y = 30;
      let rowCount = 0; // Contador de linhas

      const colWidthNome = 120;
      const colWidthValor = 50;
      const rowHeight = 8;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.rect(10, y, colWidthNome, rowHeight);
      doc.rect(10 + colWidthNome, y, colWidthValor, rowHeight);
      doc.text('Nome', 15, y + 5);
      doc.text('Valor', 15 + colWidthNome, y + 5);
      doc.line(10, y + rowHeight, 10 + colWidthNome + colWidthValor, y + rowHeight);
      y += rowHeight;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      products.forEach((row) => {
        const nome = row.name;
        const valor = `R$ ${String(Number(row.value).toFixed(2)).replace('.', ',')}`;

        doc.rect(10, y, colWidthNome, rowHeight);
        doc.rect(10 + colWidthNome, y, colWidthValor, rowHeight);

        doc.text(nome, 15, y + 5);
        doc.text(valor.toString(), 15 + colWidthNome, y + 5);

        doc.line(10, y + rowHeight, 10 + colWidthNome + colWidthValor, y + rowHeight);

        y += rowHeight;
        rowCount++;

        // Se atingir 30 linhas, adicione uma nova página
        if (rowCount === 30) {
          doc.addPage();
          y = 10; // Redefina a posição y para o início da página
          rowCount = 0; // Redefina o contador de linhas
        }
      });

      doc.save(`${tmpFolder}/products.pdf`);

      return {
        success: true,
        filename: `${tmpFolder}/products.pdf`
      }

    } catch (e) {
      console.log(e)
      const error: CustomError = new Error(
        "Erro ao obter dados"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { ProductToPdfUseCase };
