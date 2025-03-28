-- senha é 123123, mas está criptografado, usando o token api.security.token.secret do application-dev.yaml
INSERT INTO `coffee-db`.users (id, full_name, email, password, created_at, profile_image_url) VALUES
    (1, 'Maria Silva', 'maria.silva@email.com', '$2a$10$examplehashedpassword1', NOW(), ''),
    (2, 'John Doe', 'john.doe@email.com', '$2a$10$examplehashedpassword2', NOW(), ''),
    (3, 'Ana Costa', 'ana.costa@email.com', '$2a$10$examplehashedpassword3', NOW(), ''),
    (4, 'Carlos Souza', 'carlos.souza@email.com', '$2a$10$examplehashedpassword4', NOW(), ''),
    (5, 'Julia Pereira', 'julia.pereira@email.com', '$2a$10$examplehashedpassword5', NOW(), ''),
    (6, 'Pedro Lima', 'pedro.lima@email.com', '$2a$10$examplehashedpassword6', NOW(), ''),
    (7, 'Felipe Almeida', 'felipe.almeida@email.com', '$2a$10$examplehashedpassword7', NOW(), ''),
    (8, 'Ricardo Oliveira', 'ricardo.oliveira@email.com', '$2a$10$examplehashedpassword8', NOW(), ''),
    (9, 'Paula Martins', 'paula.martins@email.com', '$2a$10$examplehashedpassword9', NOW(), ''),
    (10, 'Lucas Rodrigues', 'lucas.rodrigues@email.com', '$2a$10$examplehashedpassword10', NOW(), ''),
    (11, 'Raquel Barbosa', 'raquel.barbosa@email.com', '$2a$10$examplehashedpassword11', NOW(), ''),
    (12, 'Gabriel Fernandes', 'gabriel.fernandes@email.com', '$2a$10$examplehashedpassword12', NOW(), ''),
    (13, 'Mariana Santos', 'mariana.santos@email.com', '$2a$10$examplehashedpassword13', NOW(), ''),
    (14, 'Luiz Costa', 'luiz.costa@email.com', '$2a$10$examplehashedpassword14', NOW(), ''),
    (15, 'Carla Gomes', 'carla.gomes@email.com', '$2a$10$examplehashedpassword15', NOW(), ''),
    (16, 'Ricardo Pereira', 'ricardo.pereira@email.com', '$2a$10$examplehashedpassword16', NOW(), ''),
    (17, 'Juliana Oliveira', 'juliana.oliveira@email.com', '$2a$10$examplehashedpassword17', NOW(), ''),
    (18, 'Renato Silva', 'renato.silva@email.com', '$2a$10$examplehashedpassword18', NOW(), ''),
    (19, 'Marcelo Almeida', 'marcelo.almeida@email.com', '$2a$10$examplehashedpassword19', NOW(), ''),
    (20, 'Tatiane Costa', 'tatiane.costa@email.com', '$2a$10$examplehashedpassword20', NOW(), ''),
    (21, 'Eduardo Souza', 'eduardo.souza@email.com', '$2a$10$examplehashedpassword21', NOW(), ''),
    (22, 'Vera Lima', 'vera.lima@email.com', '$2a$10$examplehashedpassword22', NOW(), ''),
    (23, 'Felipe Rocha', 'felipe.rocha@email.com', '$2a$10$examplehashedpassword23', NOW(), '');

-- Associando roles aos usuários
-- Usuário 1: Maria Silva (com todas as funções)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (1, 1),  -- ADMIN para Maria Silva
    (2, 1),  -- MANAGER para Maria Silva
    (3, 1),  -- CASHIER para Maria Silva
    (4, 1);  -- ATTENDANT para Maria Silva

-- Usuário 2: John Doe (com MANAGER, CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (2, 2),  -- MANAGER para John Doe
    (3, 2),  -- CASHIER para John Doe
    (4, 2);  -- ATTENDANT para John Doe

-- Usuário 3: Ana Costa (com MANAGER, CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (2, 3),  -- MANAGER para Ana Costa
    (3, 3),  -- CASHIER para Ana Costa
    (4, 3);  -- ATTENDANT para Ana Costa

-- Usuário 4: Carlos Souza (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 4),  -- CASHIER para Carlos Souza
    (4, 4);  -- ATTENDANT para Carlos Souza

-- Usuário 5: Julia Pereira (com ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (4, 5);  -- ATTENDANT para Julia Pereira

-- Usuário 6: Pedro Lima (com ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (4, 6);  -- ATTENDANT para Pedro Lima

-- Usuário 7: Felipe Almeida (com ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (4, 7);  -- ATTENDANT para Felipe Almeida

-- Usuário 8: Ricardo Oliveira (com ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (4, 8);  -- ATTENDANT para Ricardo Oliveira

-- Usuário 9: Paula Martins (com ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (4, 9);  -- ATTENDANT para Paula Martins

-- Usuário 10: Lucas Rodrigues (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 10), -- CASHIER para Lucas Rodrigues
    (4, 10); -- ATTENDANT para Lucas Rodrigues

-- Usuário 11: Raquel Barbosa (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 11), -- CASHIER para Raquel Barbosa
    (4, 11); -- ATTENDANT para Raquel Barbosa

-- Usuário 12: Gabriel Fernandes (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 12), -- CASHIER para Gabriel Fernandes
    (4, 12); -- ATTENDANT para Gabriel Fernandes

-- Usuário 13: Mariana Santos (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 13), -- CASHIER para Mariana Santos
    (4, 13); -- ATTENDANT para Mariana Santos

-- Usuário 14: Luiz Costa (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 14), -- CASHIER para Luiz Costa
    (4, 14); -- ATTENDANT para Luiz Costa

-- Usuário 15: Carla Gomes (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 15), -- CASHIER para Carla Gomes
    (4, 15); -- ATTENDANT para Carla Gomes

-- Usuário 16: Ricardo Pereira (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 16), -- CASHIER para Ricardo Pereira
    (4, 16); -- ATTENDANT para Ricardo Pereira

-- Usuário 17: Juliana Oliveira (com CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (3, 17), -- CASHIER para Juliana Oliveira
    (4, 17); -- ATTENDANT para Juliana Oliveira

-- Usuário 18: Renato Silva (com MANAGER, CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (2, 18), -- MANAGER para Renato Silva
    (3, 18), -- CASHIER para Renato Silva
    (4, 18); -- ATTENDANT para Renato Silva

-- Usuário 19: Marcelo Almeida (com MANAGER, CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (2, 19), -- MANAGER para Marcelo Almeida
    (3, 19), -- CASHIER para Marcelo Almeida
    (4, 19); -- ATTENDANT para Marcelo Almeida

-- Usuário 20: Tatiane Costa (com MANAGER, CASHIER e ATTENDANT)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (2, 20), -- MANAGER para Tatiane Costa
    (3, 20), -- CASHIER para Tatiane Costa
    (4, 20); -- ATTENDANT para Tatiane Costa

-- Usuário 21: Eduardo Souza (com todas as funções)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (1, 21), -- ADMIN para Eduardo Souza
    (2, 21), -- MANAGER para Eduardo Souza
    (3, 21), -- CASHIER para Eduardo Souza
    (4, 21); -- ATTENDANT para Eduardo Souza

-- Usuário 22: Vera Lima (com todas as funções)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (1, 22), -- ADMIN para Vera Lima
    (2, 22), -- MANAGER para Vera Lima
    (3, 22), -- CASHIER para Vera Lima
    (4, 22); -- ATTENDANT para Vera Lima

-- Usuário 23: Felipe Rocha (com todas as funções)
INSERT INTO `coffee-db`.`user_roles` (role_id, user_id) VALUES
    (1, 23), -- ADMIN para Felipe Rocha
    (2, 23), -- MANAGER para Felipe Rocha
    (3, 23), -- CASHIER para Felipe Rocha
    (4, 23); -- ATTENDANT para Felipe Rocha


-- Inserindo 20 categorias de produtos
INSERT INTO `coffee-db`.`product_categories` (id, name) VALUES
    (1, "Pão"),
    (2, "Bolo"),
    (3, "Café"),
    (4, "Chá"),
    (5, "Suco"),
    (6, "Salgado"),
    (7, "Doce"),
    (8, "Leite"),
    (9, "Refrigerante"),
    (10, "Chocolate"),
    (11, "Torrada"),
    (12, "Queijo"),
    (13, "Manteiga"),
    (14, "Mel"),
    (15, "Granola"),
    (16, "Iogurte"),
    (17, "Frutas"),
    (18, "Biscoito"),
    (19, "Sanduíche"),
    (20, "Vitamina");

-- Inserindo 20 produtos diferentes
INSERT INTO `coffee-db`.`products` (id, name, description, product_category_id, created_at, stock, unit_id) VALUES
    (1, "Pão francês", "Pão crocante e saboroso", 1, NOW(), 20, 8),
    (2, "Pão de queijo", "Pão mineiro tradicional", 1, NOW(), 30, 8),
    (3, "Bolo de cenoura", "Bolo com cobertura de chocolate", 2, NOW(), 15, 5),
    (4, "Bolo de milho", "Bolo típico de festa junina", 2, NOW(), 12, 5),
    (5, "Café expresso", "Café forte e encorpado", 3, NOW(), 25, 1),
    (6, "Café com leite", "Mistura equilibrada de café e leite", 3, NOW(), 10, 1),
    (7, "Chá de camomila", "Chá calmante e relaxante", 4, NOW(), 18, 2),
    (8, "Chá verde", "Chá rico em antioxidantes", 4, NOW(), 20, 2),
    (9, "Suco de laranja", "Suco natural sem açúcar", 5, NOW(), 22, 3),
    (10, "Suco de uva", "Suco integral de uva", 5, NOW(), 14, 3),
    (11, "Coxinha", "Salgado recheado com frango", 6, NOW(), 25, 9),
    (12, "Esfirra", "Esfirra aberta de carne", 6, NOW(), 18, 9),
    (13, "Brigadeiro", "Doce típico brasileiro", 7, NOW(), 30, 7),
    (14, "Beijinho", "Doce de coco com leite condensado", 7, NOW(), 28, 7),
    (15, "Leite integral", "Leite fresco pasteurizado", 8, NOW(), 20, 10),
    (16, "Refrigerante cola", "Bebida gaseificada", 9, NOW(), 40, 6),
    (17, "Chocolate quente", "Chocolate derretido com leite", 10, NOW(), 15, 1),
    (18, "Queijo minas", "Queijo branco e suave", 12, NOW(), 10, 4),
    (19, "Sanduíche natural", "Sanduíche de frango com alface", 19, NOW(), 12, 9),
    (20, "Vitamina de banana", "Vitamina nutritiva e saborosa", 20, NOW(), 10, 3);

-- Inserindo 30 mesas
INSERT INTO `coffee-db`.`dining_table` (id, name, busy, created_at) VALUES
    (1, "A1 - Interno", false, NOW()),
    (2, "A2 - Interno", false, NOW()),
    (3, "A3 - Interno", false, NOW()),
    (4, "A4 - Interno", false, NOW()),
    (5, "A5 - Interno", false, NOW()),
    (6, "A6 - Interno", false, NOW()),
    (7, "B1 - Externo", false, NOW()),
    (8, "B2 - Externo", false, NOW()),
    (9, "B3 - Externo", false, NOW()),
    (10, "B4 - Externo", false, NOW()),
    (11, "B5 - Externo", false, NOW()),
    (12, "B6 - Externo", false, NOW()),
    (13, "C1 - Mezanino", false, NOW()),
    (14, "C2 - Mezanino", false, NOW()),
    (15, "C3 - Mezanino", false, NOW()),
    (16, "C4 - Mezanino", false, NOW()),
    (17, "C5 - Mezanino", false, NOW()),
    (18, "C6 - Mezanino", false, NOW()),
    (19, "VIP1 - Exclusivo", false, NOW()),
    (20, "VIP2 - Exclusivo", false, NOW()),
    (21, "VIP3 - Exclusivo", false, NOW()),
    (22, "VIP4 - Exclusivo", false, NOW()),
    (23, "D1 - Reservado", false, NOW()),
    (24, "D2 - Reservado", false, NOW()),
    (25, "D3 - Reservado", false, NOW()),
    (26, "D4 - Reservado", false, NOW()),
    (27, "D5 - Reservado", false, NOW()),
    (28, "D6 - Reservado", false, NOW()),
    (29, "B7 - Externo", false, NOW()),
    (30, "A7 - Interno", false, NOW());
