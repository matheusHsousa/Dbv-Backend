import { db } from "../db.js";
import { parseISO, getDay } from 'date-fns';
import wbm from "wbm";

export const getEstabelecimentos = (_, res) => {
  const q = "SELECT * FROM estabelecimentos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const creatChallenge = (req, res) => {
  const {
    title,
    image,
    description_ch,
    points,
    deadLine,
  } = req.body;

  const q = `
    INSERT INTO challenges
    (title, image, description_ch, points, deadLine)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    q,
    [
      title, image, description_ch, points, deadLine
    ],
    (err, result) => {
      if (err) return res.json(err);

      return res.status(201).json({ id: result.insertId });
    }
  );
};

export const getcustomers = (_, res) => {
  const q = "SELECT * FROM t_customers WHERE status = true";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getcustomersByPage = (_, res) => {
  const q =
    "SELECT id, customer, name, type, celNumber, addressNumber, state, city, address, description, iconPerfil, CEP FROM t_customers WHERE status = true";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};


export const getChallenges = (_, res) => {
  const q =
    "SELECT id, title, image, description_ch, points, deadLine, created_at FROM challenges ORDER BY created_at DESC";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};


export const getCustomerById = (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM t_customers WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.status(200).json(data[0]);
  });
};

export const updateStatus = (req, res) => {
  const { id, status } = req.body;

  const q = `
    UPDATE t_customers
    SET status = ?
    WHERE id = ?
  `;

  db.query(q, [status, id], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    return res.status(200).json({ message: "Status atualizado com sucesso" });
  });
};

export const getStatus = (req, res) => {
  const { id } = req.params;

  const q = `
    SELECT status from  t_customers
    WHERE id = ?
  `;

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    if (data.length === 0) {
      return res.status(404).json("Cliente não encontrado");
    }

    return res.status(200).json(data[0].status);
  });
};

export const editCustomer = (req, res) => {
  const {
    id,
    customer,
    name,
    type,
    cnpj,
    celNumber,
    addressNumber,
    state,
    city,
    role,
    address,
    status,
    login,
    password,
    description,
  } = req.body;

  const q = `
    UPDATE t_customers
    SET
      customer = ?,
      name = ?,
      type = ?,
      cnpj = ?,
      celNumber = ?,
      addressNumber = ?,
      state = ?,
      city = ?,
      role = ?,
      address = ?,
      status = ?,
      login = ?,
      password = ?,
      description = ?
    WHERE id = ?
  `;

  db.query(
    q,
    [
      customer,
      name,
      type,
      cnpj,
      celNumber,
      addressNumber,
      state,
      city,
      role,
      address,
      status,
      login,
      password,
      description,
      id,
    ],
    (err, result) => {
      if (err) return res.json(err);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Estabelecimento não encontrado" });
      }

      return res.status(200).json({ message: "Dados atualizados com sucesso" });
    }
  );
};

export const editCustomerViewAdm = (req, res) => {
  const {
    id,
    customer,
    name,
    type,
    cnpj,
    celNumber,
    addressNumber,
    state,
    city,
    role,
    address,
    status,
    login,
    password,
  } = req.body;

  const q = `
  UPDATE t_customers
  SET
    customer = ?,
    name = ?,
    type = ?,
    cnpj = ?,
    celNumber = ?,
    addressNumber = ?,
    state = ?,
    city = ?,
    role = ?,
    address = ?,
    status = ?,
    login = ?,
    password = ?
  WHERE id = ?;`;

  db.query(
    q,
    [
      customer,
      name,
      type,
      cnpj,
      celNumber,
      addressNumber,
      state,
      city,
      role,
      address,
      status,
      login,
      password,
      id,
    ],
    (err, result) => {
      if (err) return res.json(err);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Estabelecimento não encontrado" });
      }

      return res.status(200).json({ message: "Dados atualizados com sucesso" });
    }
  );
};

export const editProfilePicture = (req, res) => {
  const { id, iconPerfil } = req.body;

  const q = `
  UPDATE t_customers
  SET
  iconPerfil = ?
  WHERE id = ?
  `;

  db.query(q, [iconPerfil, id], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    return res.status(200).json({ message: "Dados atualizados com sucesso" });
  });
};

export const editPhotos = (req, res) => {
  const { id, fotos } = req.body;

  const checkCustomerQuery = `
    SELECT * FROM base64
    WHERE customer_id = ?
  `;

  db.query(checkCustomerQuery, [id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Erro ao verificar se o cliente existe:", checkErr);
      res.status(500).json({ error: "Erro interno ao verificar cliente." });
    } else {
      if (checkResult.length > 0) {
        updateImages(id, fotos, checkResult, res);
      } else {
        insertNewCustomer(id, fotos, res);
      }
    }
  });
};

const updateImages = (customerId, images, checkResult, res) => {
  for (let i = 0; i < images.length; i++) {
    const imageBase64 = images[i];

    if (imageBase64) {
      const columnName = `image${i + 1}`;
      const existingImages = checkResult[0][columnName];
      const updatedImages = existingImages
        ? `${existingImages},${imageBase64}`
        : imageBase64;

      const updateQuery = `
        UPDATE base64
        SET ${columnName} = ?
        WHERE customer_id = ?
      `;

      const updateValues = [updatedImages, customerId];

      db.query(updateQuery, updateValues, (updateErr, updateResult) => {
        if (updateErr) {
          console.error(
            `Erro ao atualizar a imagem ${i + 1} do cliente:`,
            updateErr
          );
          res.status(500).json({ error: "Erro interno ao atualizar imagens." });
        } else {
          console.log(`Imagem ${i + 1} atualizada com sucesso.`);
        }
      });
    }
  }

  res.status(200).json({ message: "Imagens atualizadas com sucesso." });
};

const insertNewCustomer = (customerId, images, res) => {
  const insertQuery = `
    INSERT INTO base64 (customer_id, ${images
      .map((_, index) => `image${index + 1}`)
      .join(", ")})
    VALUES (?, ${images.map(() => "?").join(", ")})
  `;

  const insertValues = [customerId, ...images];

  db.query(insertQuery, insertValues, (insertErr, insertResult) => {
    if (insertErr) {
      console.error(
        "Erro ao inserir novo cliente no banco de dados:",
        insertErr
      );
      res.status(500).json({ error: "Erro interno ao inserir novo cliente." });
    } else {
      console.log(`Novo cliente e imagens inseridos com sucesso.`);
      res.status(200).json({ message: "Imagens salvas com sucesso." });
    }
  });
};

export const getFotos = (req, res) => {
  const id = req.params.id;

  const q = `
    SELECT *
    FROM base64
    WHERE customer_id = ?
  `;

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    const { customer_id, ...images } = result[0];
    const fotosArray = [];

    for (let i = 1; i <= 9; i++) {
      const columnName = `image${i}`;
      const imageBase64 = images[columnName];

      if (imageBase64) {
        fotosArray.push(imageBase64);
      }
    }

    res.status(200).json(fotosArray);
  });
};

export const getCategorias = (_, res) => {
  const q = "SELECT tipos FROM categorias;";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getProfilePicture = (req, res) => {
  const { id } = req.params;

  const q = `
    SELECT iconPerfil FROM t_customers
    WHERE id = ?
  `;

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    if (data.length === 0) {
      return res.status(404).json("Cliente não encontrado");
    }

    return res.status(200).json(data[0].iconPerfil);
  });
};

export const getRoles = (_, res) => {
  const q = "SELECT roles FROM permissoes;";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const filterCategory = (req, res) => {
  let { name, type } = req.body;

  name = name ? String(name).toLowerCase() : "";
  type = type ? String(type).toLowerCase() : "";

  console.log("name:", name);
  console.log("type:", type);

  let query = `
    SELECT id, customer, address, type, description, iconPerfil
    FROM t_customers
  `;

  if (name !== "") {
    query += ` WHERE LOWER(customer) LIKE '%${name}%' COLLATE utf8_general_ci`;
  }

  if (type !== "") {
    query += ` ${name !== "" ? "AND" : "WHERE"} LOWER(type) = '${type}'`;
  }

  db.query(query, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });

  console.log("SQL Query:", query);
};

export const getUserByLoginAndPassword = (req, res) => {
  const { login, password } = req.body;

  const query = `
    SELECT id, memberName, role, image
    FROM members
    WHERE login = ? AND password = ?;
  `;

  db.query(query, [login, password], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const userData = data[0];
    const { id, name, role, iconPerfil } = userData;

    return res.status(200).json({ id, name, role, iconPerfil });
  });
};


export const deleteImage = (req, res) => {
  const { id, index } = req.body;

  const imageColumnName = `image${index + 1}`;

  let q = `
    UPDATE base64
    SET ${imageColumnName} = NULL
    WHERE customer_id = ?
  `;

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error("Erro ao executar a query:", err);
      return res
        .status(500)
        .json({ error: "Erro interno do servidor", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum registro encontrado para o customer_id" });
    }

    return res.status(200).json({
      message: `Campo ${imageColumnName} deletado com sucesso para o customer_id ${id}`,
    });
  });
};

export const avaliation = (req, res) => {
  const { id_user, customer_id, avaliation } = req.body;

  const checkAvaliationQuery = `
    SELECT * FROM classification
    WHERE customer_id = ? AND id_user = ?
  `;

  db.query(
    checkAvaliationQuery,
    [customer_id, id_user],
    (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Erro ao verificar a avaliação existente:", checkErr);
        res
          .status(500)
          .json({ error: "Erro interno ao verificar a avaliação." });
      } else {
        if (checkResult.length > 0) {
          updateAvaliation(id_user, customer_id, avaliation, res);
        } else {
          insertNewAvaliation(id_user, customer_id, avaliation, res);
        }
      }
    }
  );
};

export const updateAvaliation = (id_user, customer_id, avaliation, res) => {
  const updateAvaliationQuery = `
    UPDATE classification
    SET avaliation = ?
    WHERE customer_id = ? AND id_user = ?
  `;

  db.query(
    updateAvaliationQuery,
    [avaliation, customer_id, id_user],
    (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Erro ao atualizar a avaliação:", updateErr);
        res
          .status(500)
          .json({ error: "Erro interno ao atualizar a avaliação." });
      } else {
        res.status(200).json({ message: "Avaliação atualizada com sucesso." });
      }
    }
  );
};

export const insertNewAvaliation = (id_user, customer_id, avaliation, res) => {
  const insertAvaliationQuery = `
    INSERT INTO classification (id_user, customer_id, avaliation)
    VALUES (?, ?, ?)
  `;

  db.query(
    insertAvaliationQuery,
    [id_user, customer_id, avaliation],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Erro ao inserir nova avaliação:", insertErr);
        res
          .status(500)
          .json({ error: "Erro interno ao inserir nova avaliação." });
      } else {
        res
          .status(201)
          .json({ message: "Nova avaliação inserida com sucesso." });
      }
    }
  );
};

export const getAvalatiation = (req, res) => {
  const { id } = req.params;

  console.log(id);

  const sql = `
    SELECT COUNT(*) as numAvaliadores, AVG(avaliation) as mediaAvaliacoes
    FROM classification
    WHERE customer_id = ?;
  `;

  db.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao buscar avaliações" });
    }

    if (results.length > 0) {
      const numAvaliadores = results[0].numAvaliadores;
      const mediaAvaliacoes = results[0].mediaAvaliacoes;
      res.json({ numAvaliadores, mediaAvaliacoes });
    } else {
      res.status(404).json({
        message: `Nenhuma avaliação encontrada para o customer_id ${id}`,
      });
    }
  });
};

export const getComments = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT comments.*, t_customers.customer, t_customers.iconPerfil
    FROM comments
    JOIN t_customers ON comments.id_User = t_customers.id
    WHERE comments.customer_id = ? AND comments.type = 'comment';
  `;

  db.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao buscar comentários" });
    }

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({
        message: `Nenhum comentário encontrado para o customer_id ${id}`,
      });
    }
  });
};

export const postComment = (req, res) => {
  const { customer_id, id_User, comment_text, parent_comment_id } = req.body;

  const sql = `
    INSERT INTO comments (customer_id, id_User, comment_text, parent_comment_id, type)
    VALUES (?, ?, ?, ?, 'comment');
  `;

  db.query(
    sql,
    [customer_id, id_User, comment_text, parent_comment_id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Erro ao adicionar comentário" });
      }

      res.status(201).json({
        message: "Comentário adicionado com sucesso",
        commentId: results.insertId,
      });
    }
  );
};

export const postReply = (req, res) => {
  const { id_User, comment_id, reply_text } = req.body;

  const sql = `
    INSERT INTO replies (id_User, comment_id, reply_text, type)
    VALUES (?, ?, ?, 'reply');
  `;

  db.query(sql, [id_User, comment_id, reply_text], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao adicionar resposta" });
    }

    res.status(201).json({
      message: "Resposta adicionada com sucesso",
      replyId: results.insertId,
    });
  });
};

export const getReplies = (req, res) => {
  const { comment_ids } = req.body;

  if (!Array.isArray(comment_ids) || comment_ids.length === 0) {
    return res.status(400).json({ error: "IDs de comentários inválidos" });
  }

  const placeholders = comment_ids.map(() => "?").join(", ");

  const sql = `
    SELECT replies.*, t_customers.customer, t_customers.iconPerfil
    FROM replies
    JOIN t_customers ON replies.id_User = t_customers.id
    WHERE replies.comment_id IN (${placeholders}) AND replies.type = 'reply';
  `;

  db.query(sql, comment_ids, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao buscar respostas" });
    }

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({
        message: `Nenhuma resposta encontrada para os comment_ids fornecidos`,
      });
    }
  });
};

export const appointments = (req, res) => {
  const { customer_id, appointment_date, appointment_time } = req.body;

  const sql = `
    INSERT INTO appointments (customer_id, appointment_date, appointment_time, status)
    VALUES (?, ?, ?, 'scheduled');
  `;

  db.query(
    sql,
    [customer_id, appointment_date, appointment_time],
    (error, results) => {
      if (error) {
        console.error("Erro ao executar a consulta SQL:", error);
        return res.status(500).json({ error: "Erro ao agendar horário" });
      }

      res.json({ message: "Horário agendado com sucesso" });
    }
  );
};

export const getAppointments = (req, res) => {
  const sql = `
      SELECT *
      FROM (
      SELECT
      appointments.*,
      t_customers.customer,
      t_customers.iconPerfil,
      ROW_NUMBER() OVER (PARTITION BY appointment_date, appointment_time ORDER BY id) AS row_num
      FROM
      appointments
      JOIN t_customers ON appointments.customer_id = t_customers.id
      WHERE
      appointments.status = 'scheduled'
      ) AS subquery
      WHERE
      subquery.row_num = 1;
    `;

  db.query(sql, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar horários agendados" });
    }

    res.json(results);
  });
};

export const getAppointmentsToCustomer = (req, res) => {
  const sql = `
      SELECT *
      FROM (
      SELECT
      appointments.*,
      t_customers.customer,
      t_customers.iconPerfil,
      ROW_NUMBER() OVER (PARTITION BY appointment_date, appointment_time ORDER BY id) AS row_num
      FROM
      appointments
      JOIN t_customers ON appointments.customer_id = t_customers.id
      WHERE
      appointments.status = 'scheduled'
      ) AS subquery
      WHERE
      subquery.row_num = 1;
    `;

  db.query(sql, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar horários agendados" });
    }

    res.json(results);
  });
};


let autenticado = false;

export const obterQRCode = async (req, res) => {
  try {
    let qrCodeData;

    if (!autenticado) {
      qrCodeData = await wbm.start({
        qrCodeData: true,
        session: false,
        showBrowser: false,
      });
      console.log("Novo QR Code Data:", qrCodeData);
      autenticado = true;
    }

    res.send({
      qrCodeData,
      mensagem: autenticado ? "Sessão já autenticada." : undefined,
    });
  } catch (err) {
    console.error(err);
    autenticado = false;

    res.status(500).send("Erro ao obter o QR Code.");
  }
};

export const enviarMensagem = async (req, res) => {
  try {
    const { phone, msg } = req.body;

    // Verifique se já está autenticado
    if (!autenticado) {
      console.log("Aguardando autenticação para enviar mensagem...");
      await wbm.waitQRCode();
      console.log("Autenticação concluída.");

      // Marque como autenticado
      autenticado = true;

      // Espere por 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    try {
      const phones = [phone];
      const msgs = [msg];
      await wbm.send(phones, msgs);
    } catch (sendError) {
      console.error("Erro ao enviar mensagem:", sendError);
    }
    res.status(200).send("Mensagem enviada com sucesso.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao autenticar e enviar a mensagem.");
  }
};


export const updateChallenge = (req, res) => {
  const {
    id,
    title,
    image,
    description_ch,
    points,
    deadLine,
  } = req.body;

  const q = `
    UPDATE challenges
    SET title = ?, image = ?, description_ch = ?, points = ?, deadLine = ?
    WHERE id = ?
  `;

  db.query(
    q,
    [
      title, image, description_ch, points, deadLine, id
    ],
    (err, result) => {
      if (err) return res.json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Challenge not found' });
      }

      return res.status(200).json({ success: true });
    }
  );
};

export const getChallengeById = (req, res) => {
  const challengeId = req.params.id;

  const q = `
    SELECT id, title, image, description_ch, points, deadLine, created_at, created_at
    FROM challenges
    WHERE id = ?
  `;

  db.query(q, [challengeId], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Desafio não encontrado" });
    }

    return res.status(200).json(data[0]);
  });
};

export const registerMember = (req, res) => {
  const {
     memberName, image, position, unit, birthday, login, password, role, status, 
    cellNumber1
  } = req.body;

  const q = `
    INSERT INTO members
    (image, memberName, position, unit, birthday, cellNumber3, role, status,
      login, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(q, [image, memberName, position, unit, birthday,
    cellNumber1, role, status, login, password],
    (err, result) => {
      if (err) return res.json(err);

      return res.status(201).json({ id: result.insertId });
    }
  );
};


export const getPositions = (_, res) => {
  const q = "SELECT position FROM position;";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getMembers = (_, res) => {
  const q = "SELECT * FROM members WHERE status = 1;";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getInactiveMembers = (_, res) => {
  const q = "SELECT * FROM members WHERE status = 0;";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getMembersbyId = (req, res) => {
  const challengeId = req.params.id;

  const q = `
    SELECT *
    FROM members
    WHERE id = ?
  `;

  db.query(q, [challengeId], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Desafio não encontrado" });
    }

    return res.status(200).json(data[0]);
  });
};

export const editMember = (req, res) => {

  const {
     id, memberName, image, position, unit, birthday, login, password, role, status, 
     cellNumber1
  } = req.body;

  const q = `
    UPDATE members
    SET
      image = ?,
      memberName = ?,
      position = ?,
      unit = ?,
      birthday = ?,
      cellNumber1 = ?,
      role = ?,
      status = ?,
      login = ?,
      password = ?
    WHERE id = ?
  `;

  db.query(q, [image, memberName, position, unit, birthday,
    cellNumber1, role, status, login, password, id],
    (err, result) => {
      if (err) return res.json(err);

      return res.status(200).json({ message: 'Member updated successfully' });
    }
  );
};

export const getStatusMember = (req, res) => {
  const { id } = req.params;

  const q = `
    SELECT status from  members
    WHERE id = ?
  `;

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    if (data.length === 0) {
      return res.status(404).json("Cliente não encontrado");
    }

    return res.status(200).json(data[0].status);
  });
};



export const changeStatus = (req, res) => {
  const { id, status } = req.body;

  const q = `
    UPDATE members
    SET status = ?
    WHERE id = ?
  `;

  db.query(q, [status, id], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    return res.status(200).json({ message: "Status atualizado com sucesso" });
  });
};


export const filterMemberName = (req, res) => {
  let { name } = req.body;

  name = name ? String(name).toLowerCase() : "";

  console.log("name:", name);

  let query = `
    SELECT *
    FROM members
    WHERE status = 1
  `;

  if (name !== "") {
    query += ` AND LOWER(memberName) LIKE ? COLLATE utf8_general_ci`;
  }

  db.query(query, [`%${name}%`], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });

  console.log("SQL Query:", query);
};

export const filterMemberNameInactive = (req, res) => {
  let { name } = req.body;

  name = name ? String(name).toLowerCase() : "";

  console.log("name:", name);

  let query = `
    SELECT *
    FROM members
    WHERE status = 0
  `;

  if (name !== "") {
    query += ` AND LOWER(memberName) LIKE ? COLLATE utf8_general_ci`;
  }

  db.query(query, [`%${name}%`], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });

  console.log("SQL Query:", query);
};

export const getUnits = (_, res) => {
  const q =
    "SELECT * from units;"

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};


export const createUnit = (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ error: 'Nome e imagem são obrigatórios' });
  }

  const q = `INSERT INTO units (name, image) VALUES ('${name}', '${image}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    return res.status(201).json({ message: 'Unidade criada com sucesso' });
  });
};

export const updateUnit = (req, res) => {

  const {
     id, name, image
  } = req.body;

  const q = `
  UPDATE units
  SET
    image = ?,
    name = ?
  WHERE id = ?
`;

db.query(q, [image, name, id], (err, result) => {
  if (err) return res.json(err);

  return res.status(200).json({ message: 'Member updated successfully' });
});
};

export const getUnityById = (req, res) => {
  const challengeId = req.params.id;

  const q = `
    SELECT *
    FROM units
    WHERE id = ?
  `;

  db.query(q, [challengeId], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Desafio não encontrado" });
    }

    return res.status(200).json(data[0]);
  });
};


export const getTools = (_, res) => {
  const q =
    "SELECT * from tools WHERE status = 1; "

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};


export const createTool = (req, res) => {
  const { name, image, quantity, status } = req.body;

  const q = 'INSERT INTO tools (name, image, quantity, status) VALUES (?, ?, ?, ?)';

  const values = [name, image, quantity, status];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    return res.status(201).json({ message: 'Unidade criada com sucesso' });
  });
};

export const updateTools = (req, res) => {

  const {
    image, name,  quantity, id
  } = req.body;

  const q = `
  UPDATE tools
  SET
    image = ?,
    name = ?,
    quantity = ?
  WHERE id = ?
`;

db.query(q, [image, name, quantity, id], (err, result) => {
  if (err) return res.json(err);

  return res.status(200).json({ message: 'Tool updated successfully' });
});
};

export const getToolsById = (req, res) => {
  const challengeId = req.params.id;

  const q = `
    SELECT *
    FROM tools
    WHERE id = ?
  `;

  db.query(q, [challengeId], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Desafio não encontrado" });
    }

    return res.status(200).json(data[0]);
  });
};

export const deleteTool = (req, res) => {
  const { id } = req.params;

  const q = `
    DELETE FROM tools
    WHERE id = ?
  `;

  db.query(q, [id], (err, result) => {
    if (err) return res.json(err);

    return res.status(200).json({ message: 'Tool deleted successfully' });
  });
};


export const updateT = (req, res) => {
  const { id, status } = req.body;

  const q = `
    UPDATE tools
    SET status = ?
    WHERE id = ?;
  `;

  db.query(q, [status, id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.json(err);
    }

    if (result.affectedRows === 0) {
      console.log("No rows affected. Establishment not found.");
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    console.log("Status updated successfully.");
    return res.status(200).json({ message: "Status atualizado com sucesso" });
  });
};

export const getNameUnits = (_, res) => {
  const q =
    "SELECT name from units "

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getMembersByUnitId = (req, res) => {
  const memberId = req.params.id;
  const getUnitQuery = "SELECT unit FROM members WHERE id = ?";

  db.query(getUnitQuery, [memberId], (err, unitResult) => {
    if (err) {
      console.error("Erro na consulta SQL para obter o unit:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (unitResult.length === 0) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }

    const unit = unitResult[0].unit;

    const getUnitDetailsQuery = "SELECT * FROM units WHERE name = ?";
    db.query(getUnitDetailsQuery, [unit], (err, unitDetailsResult) => {
      if (err) {
        console.error("Erro na consulta SQL para obter detalhes da unidade:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (unitDetailsResult.length === 0) {
        return res.status(404).json({ error: "Detalhes da unidade não encontrados" });
      }

      const unitDetails = unitDetailsResult[0];

      const getMembersQuery = "SELECT memberName, image, id, position FROM members WHERE unit = ?";
      db.query(getMembersQuery, [unit], (err, membersResult) => {
        if (err) {
          console.error("Erro na consulta SQL para obter membros pelo unit:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        const promises = membersResult.map((member) => {
          const getPointsQuery = "SELECT SUM(points) AS totalPoints FROM points WHERE userId = ?";
          return new Promise((resolve, reject) => {
            db.query(getPointsQuery, [member.id], (err, pointsResult) => {
              if (err) {
                console.error("Erro na consulta SQL para obter pontos do membro:", err);
                reject(err);
              } else {
                const totalPoints = pointsResult[0].totalPoints || 0;
                resolve({ ...member, totalPoints });
              }
            });
          });
        });

        Promise.all(promises)
          .then((membersWithPoints) => {
            return res.status(200).json({ unit: unitDetails, members: membersWithPoints });
          })
          .catch((error) => {
            return res.status(500).json({ error: "Erro interno do servidor" });
          });
      });
    });
  });
};

export const addPoints = (req, res) => {
  const { userId, points, date } = req.body.data;

  const parsedDate = parseISO(date);
  if (getDay(parsedDate) !== 0) {
    return res.status(400).json({ error: 'Só é permitido registrar pontos aos domingos' });
  }

  const checkDuplicateQuery = 'SELECT * FROM points WHERE userId = ? AND date = ?';
  const checkDuplicateValues = [userId, date];

  db.query(checkDuplicateQuery, checkDuplicateValues, (duplicateErr, duplicateData) => {
    if (duplicateErr) {
      console.error('Erro na consulta SQL:', duplicateErr);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (duplicateData.length > 0) {
      return res.status(400).json({ error: 'Já existe um registro para este usuário nesta data' });
    }

    const insertQuery = 'INSERT INTO points (userId, points, date) VALUES (?, ?, ?)';
    const insertValues = [userId, points, date];

    db.query(insertQuery, insertValues, (err, data) => {
      if (err) {
        console.error('Erro na consulta SQL:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      return res.status(201).json({ message: 'Pontos inseridos com sucesso' });
    });
  });
};


export const createPublications = (req, res) => {
  const {
    userId,
    challengeId,
    publicationImage,
    text_field
  } = req.body;

  if (!userId || !challengeId) {
    return res.status(400).json({ mensagem: 'userId e challengeId são obrigatórios' });
  }

  if (!publicationImage && !text_field) {
    return res.status(400).json({ mensagem: 'Forneça pelo menos image ou text_field' });
  }

  const q = `
    INSERT INTO publication
    (userId, challengeId, publicationImage, text_field)
    VALUES (?, ?, IFNULL(?, ''), IFNULL(?, ''))
  `;

  db.query(
    q,
    [
      userId, challengeId, publicationImage, text_field
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro Interno do Servidor', detalhes: err });
      }

      return res.status(201).json({ mensagem: 'Publicação criada com sucesso' });
    }
  );
};

export const getPublicationsByChallengeId = (req, res) => {
  const { challengeId } = req.params;

  const q = `
    SELECT publication.*, members.memberName, members.position, members.image
    FROM publication
    JOIN members ON publication.UserId = members.id
    WHERE publication.challengeId = ?
    ORDER BY publication.date DESC
    ;
  `;

  db.query(q, [challengeId], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro Interno do Servidor', detalhes: err });
    }

    return res.status(200).json(results);
  });
};

export const postLike = (req, res) => {
  const { userId, publicationId, like } = req.body;

  const checkQuery = `
    SELECT * FROM likes
    WHERE UserId = ? AND publicationId = ?;
  `;

  db.query(checkQuery, [userId, publicationId], (checkErr, checkResults) => {
    if (checkErr) {
      return res.status(500).json({ error: 'Erro Interno do Servidor', details: checkErr });
    }

    if (checkResults.length > 0) {
      // Se o registro já existe, atualize
      const updateQuery = `
        UPDATE likes
        SET \`like\` = ?
        WHERE UserId = ? AND publicationId = ?;
      `;

      db.query(updateQuery, [like, userId, publicationId], (updateErr, updateResults) => {
        if (updateErr) {
          return res.status(500).json({ error: 'Erro Interno do Servidor', details: updateErr });
        }

        return res.status(200).json({ message: 'Like atualizado com sucesso' });
      });
    } else {
      const insertQuery = `
        INSERT INTO likes (UserId, publicationId, \`like\`)
        VALUES (?, ?, ?);
      `;

      db.query(insertQuery, [userId, publicationId, like], (insertErr, insertResults) => {
        if (insertErr) {
          return res.status(500).json({ error: 'Erro Interno do Servidor', details: insertErr });
        }

        return res.status(201).json({ message: 'Like registrado com sucesso' });
      });
    }
  });
};

// export const getLikes = (req, res) => {
//   const { publicationId } = req.query;

//   const query = `
//     SELECT COUNT(*) AS total_likes
//     FROM likes
//     WHERE publicationId = ${publicationId}
//       AND \`like\` = true;
//   `;

//   db.query(query, (error, results) => {
//     if (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//       throw error;
//     }

//     res.status(200).json(results[0]);
//   });
// };

// export const checkUserLike = (req, res) => {
//   const { userId, publicationId } = req.query;

//   const query = `
//     SELECT COUNT(*) AS user_likes
//     FROM likes
//     WHERE UserId = ${userId}
//       AND publicationId = ${publicationId}
//       AND \`like\` = true;
//   `;

//   db.query(query, (error, results) => {
//     if (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//       throw error;
//     }

//     const userLiked = results[0].user_likes > 0; 

//     res.status(200).json({ userLiked });
//   });
// };

export const chellengePoints =  (req, res) => {
  const { userId, challengerId, points, date } = req.body;

  if (isNaN(points)) {
    return res.status(400).json({ error: 'Valor invalido.' });
  }

  const checkQuery = `
    SELECT * FROM points
    WHERE userId = ? AND challengerId = ?;
  `;

  db.query(checkQuery, [userId, challengerId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      throw error;
    }

    if (results.length > 0) {
      const updateQuery = `
        UPDATE points
        SET points = ?
        WHERE userId = ? AND challengerId = ?;
      `;

      db.query(updateQuery, [points, userId, challengerId, date], (updateError) => {
        if (updateError) {
          res.status(500).json({ error: 'Internal Server Error' });
          throw updateError;
        }

        res.status(200).json({ message: 'Points updated successfully' });
      });
    } else {
      const insertQuery = `
        INSERT INTO points (userId, challengerId, points, date)
        VALUES (?, ?, ?, ?);
      `;

      db.query(insertQuery, [userId, challengerId, points, date], (insertError) => {
        if (insertError) {
          res.status(500).json({ error: 'Internal Server Error' });
          throw insertError;
        }

        res.status(200).json({ message: 'Points added successfully' });
      });
    }
  });
}


// export const getChallengePoints = (req, res) => {
//   const { userId, challengerId } = req.query;

//   const q = `
//   SELECT * FROM points
//   WHERE userId = ? AND challengerId = ?; 
// `;

// db.query(q, [userId, challengerId], (err, results) => {
//   if (err) {
//     console.error('Erro ao executar a consulta:', err);
//     return res.status(500).json({ erro: 'Erro Interno do Servidor', detalhes: err });
//   }

//   console.log('Linhas encontradas:', results);

//   return res.status(200).json(results);
// });
// }


export const getChallengePoints = (req, res) => {
  const { userId, challengerId } = req.query;

  if (!userId || !challengerId) {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }

  const q = `
    SELECT * FROM points
    WHERE userId = ? AND challengerId = ?
    LIMIT 1; 
  `;

  db.query(q, [userId, challengerId], (err, data) => {
    if (err) {
      console.error("SQL Query Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("SQL Query:", q);
    console.log("Query Result:", data);

    if (data && data.length > 0) {
      return res.status(200).json(data[0]);
    } else {
      return res.status(200).json({});
    }
  });
};

export const getAllMembersWithPoints = (req, res) => {
  const getAllMembersQuery = "SELECT memberName, image, id, position FROM members";

  db.query(getAllMembersQuery, (err, membersResult) => {
    if (err) {
      console.error("Erro na consulta SQL para obter todos os membros:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    const promises = membersResult.map((member) => {
      const getPointsQuery = "SELECT SUM(points) AS totalPoints FROM points WHERE userId = ?";
      return new Promise((resolve, reject) => {
        db.query(getPointsQuery, [member.id], (err, pointsResult) => {
          if (err) {
            console.error("Erro na consulta SQL para obter pontos do membro:", err);
            reject(err);
          } else {
            const totalPoints = pointsResult[0].totalPoints || 0;
            resolve({ ...member, totalPoints });
          }
        });
      });
    });

    Promise.all(promises)
      .then((membersWithPoints) => {
        return res.status(200).json({ members: membersWithPoints });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Erro interno do servidor" });
      });
  });
};
