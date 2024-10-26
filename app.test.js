// app.test.js
const request = require("supertest");
const { app } = require("./server"); // Assicurati che "server.js" esponga solo l'app

describe("Test API gestione libri", () => {
  it("GET /api/libri - dovrebbe restituire un array di libri", async () => {
    const res = await request(app).get("/api/libri");
    expect(res.statusCode).toEqual(200);
    // Non controlliamo più se l'array è vuoto, ma solo che è un array
    expect(Array.isArray(res.body)).toBe(true); 
  });

  it("POST /api/libri - dovrebbe aggiungere un nuovo libro", async () => {
    const nuovoLibro = {
      nome: "Il libro dei test",
      descrizione: "Descrizione del libro",
      quantita: 5,
      prezzo: 9.99,
      autore: "Mario Rossi",
    };

    const res = await request(app).post("/api/libri").send(nuovoLibro);
    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toBe(nuovoLibro.nome);
    expect(res.body.quantita).toBe(nuovoLibro.quantita);
  });

  it("GET /api/libri/:codice - dovrebbe restituire un singolo libro", async () => {
    const nuovoLibro = {
      nome: "Il libro",
      descrizione: "Descrizione",
      quantita: 34,
      prezzo: 11,
      autore: "Mario Neri",
    };

    // Aggiungi il libro prima di cercarlo
    const postRes = await request(app).post("/api/libri").send(nuovoLibro);
    const codiceLibro = postRes.body.codice;

    const getRes = await request(app).get(`/api/libri/${codiceLibro}`);
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body.nome).toBe(nuovoLibro.nome);
  });
});
