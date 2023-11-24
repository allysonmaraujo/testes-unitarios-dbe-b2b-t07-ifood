const app = require("../../src/servidor");
const request = require("supertest");

describe("Cadastrar Usuarios", () => {
  test("Cadastrar usuario sem informar a propriedade nome", async () => {
    const resposta = await request(app).post("/contas").send({
      email: "allyson@teste.com.br",
      cpf: "11122233344",
      data_nascimento: "08/07/1983",
      telefone: "41988885555",
      senha: "123456",
    });
    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Cadastrar usuario sem informar a propriedade cpf", async () => {
    const resposta = await request(app).post("/contas").send({
      nome: "Allyson",
      email: "allyson@teste.com.br",
      data_nascimento: "08/07/1983",
      telefone: "41988885555",
      senha: "123456",
    });
    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Cadastrar usuario sem informar a propriedade data_nascimento", async () => {
    const resposta = await request(app).post("/contas").send({
      nome: "Allyson",
      email: "allyson@teste.com.br",
      cpf: "11122233344",
      telefone: "41988885555",
      senha: "123456",
    });
    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Cadastrar usuario sem informar a propriedade telefone", async () => {
    const resposta = await request(app).post("/contas").send({
      nome: "Allyson",
      email: "allyson@teste.com.br",
      cpf: "11122233344",
      data_nascimento: "08/07/1983",
      senha: "123456",
    });
    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Cadastrar usuario sem informar a propriedade email", async () => {
    const resposta = await request(app).post("/contas").send({
      nome: "Allyson Araujo",
      cpf: "11122233344",
      data_nascimento: "08/07/1983",
      telefone: "41988885555",
      senha: "123456",
    });
    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Cadastrar usuario sem informar a propriedade senha", async () => {
    const resposta = await request(app).post("/contas").send({
      nomoe: "Allyson",
      email: "allyson@teste.com.br",
      cpf: "11122233344",
      data_nascimento: "08/07/1983",
      telefone: "41988885555",
    });
    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Cadastrar usuario informando email duplicado/existente", async () => {
    await request(app).post("/contas").send({
      nome: "Allyson Araujo",
      email: "allyson@teste.com.br",
      cpf: "11122233344",
      data_nascimento: "08/07/1983",
      telefone: "41988885555",
      senha: "123456",
    });

    const resposta = await request(app).post("/contas").send({
      nome: "Gomes Queiroz",
      email: "allyson@teste.com.br",
      data_nascimento: "05/04/1985",
      telefone: "21222225555",
      senha: "987654",
    });
    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });
});
