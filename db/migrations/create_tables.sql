-- Criação da tabela Mmiolo
CREATE TABLE IF NOT EXISTS Mmiolo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_url TEXT NOT NULL,
    form_segmento TEXT NOT NULL,
    id_sort INTEGER NOT NULL,
    creation_date DATETIME,
    modified_date DATETIME,
    slug TEXT,
    creator TEXT,
    UNIQUE(form_segmento, id_sort)
);

-- Inserção dos dados na tabela Mmiolo
INSERT INTO Mmiolo (file_url, form_segmento, id_sort, creation_date, modified_date, slug, creator) VALUES
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401043927x344956645103745150/carroMiolo1.mp4', 'Carros', 1, '2025-01-20 16:24:00', '2025-01-20 16:24:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401075526x676559723559771100/carroMiolo2.mp4', 'Carros', 2, '2025-01-20 16:24:00', '2025-01-20 16:24:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401099512x408323161536878500/carroMiolo3.mp4', 'Carros', 3, '2025-01-20 16:25:00', '2025-01-20 16:25:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401142991x769589510301051000/eduMiolo1.mp4', 'Educação', 1, '2025-01-20 16:25:00', '2025-01-20 16:25:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401172175x887671464231736000/eduMiolo2.mp4', 'Educação', 2, '2025-01-20 16:26:00', '2025-01-20 16:26:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401191502x623820902422230800/eduMiolo3.mp4', 'Educação', 3, '2025-01-20 16:26:00', '2025-01-20 16:26:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737478051902x808693933761051300/modaMiolo1%20%281%29.mp4', 'Moda', 1, '2025-01-20 16:27:00', '2025-01-21 13:47:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737478075454x674255968627687000/modaMiolo2%20%281%29.mp4', 'Moda', 2, '2025-01-20 16:27:00', '2025-01-21 13:47:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401277309x482756316077523460/modaMiolo3.mp4', 'Moda', 3, '2025-01-20 16:28:00', '2025-01-20 16:28:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737478103006x950931566599126000/supMiolo1%20%281%29.mp4', 'Supermercado', 1, '2025-01-20 16:31:00', '2025-01-21 13:48:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401493622x538837130914304060/supMiolo2.mp4', 'Supermercado', 2, '2025-01-20 16:31:00', '2025-01-20 16:31:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401511101x339051880170087700/supMiolo3.mp4', 'Supermercado', 3, '2025-01-20 16:31:00', '2025-01-20 16:31:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401585784x132846469528500320/techMiolo1.mp4', 'Tecnologia', 1, '2025-01-20 16:33:00', '2025-01-20 16:33:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401603912x516643232475700700/techMiolo2.mp4', 'Tecnologia', 2, '2025-01-20 16:33:00', '2025-01-20 16:33:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401625938x283047775091001660/techMiolo3.mp4', 'Tecnologia', 3, '2025-01-20 16:34:00', '2025-01-20 16:34:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737402814582x898462468175510900/carroMiolo4.mp4', 'Carros', 4, '2025-01-20 16:53:00', '2025-01-20 16:53:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737402849942x804733845307211600/eduMiolo4.mp4', 'Educação', 4, '2025-01-20 16:54:00', '2025-01-20 16:54:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737402884982x881060472401428400/modaMiolo4.mp4', 'Moda', 4, '2025-01-20 16:54:00', '2025-01-20 16:54:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737402915821x177870664733743140/supMiolo4.mp4', 'Supermercado', 4, '2025-01-20 16:55:00', '2025-01-20 16:55:00', '', '(App admin)'),
('https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737402962776x103299653440607870/techMiolo4.mp4', 'Tecnologia', 4, '2025-01-20 16:56:00', '2025-01-20 16:56:00', '', '(App admin)');

-- Criação de índices para melhor performance
CREATE INDEX idx_mmiolo_segmento ON Mmiolo(form_segmento);
CREATE INDEX idx_mmiolo_sort ON Mmiolo(id_sort); 