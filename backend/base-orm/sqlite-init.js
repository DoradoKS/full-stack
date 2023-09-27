// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/cine.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  sql =
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'";
res = await db.get(sql, []);
if (res.contar > 0) existe = true;
if (!existe) {
  await db.run(
    `CREATE table peliculas( 
            Peli_Codigo INTEGER PRIMARY KEY AUTOINCREMENT
          , Peli_Titulo text NOT NULL
          , Peli_Duracion text NOT NULL
          , Peli_Genero text NOT NULL
          , Peli_Clase text NOT NULL
          , Peli_FechaLanzamiento text NOT NULL
          , Peli_CantVisualizaciones INTEGER NOT NULL
          );`
  );
  console.log("tabla peliculas creada!");

  await db.run(
    `insert into peliculas values
    (1, 'El Gran Escape', '120 min', 'Acción', 'APT', '2023-06-01', 323),
    (2, 'La Bella y la Bestia', '135 min', 'Fantasía', 'APT', '2023-06-02', 389),
    (3, 'El Padrino', '175 min', 'Drama', 'SAM13', '2023-06-03', 448),
    (4, 'Jurassic Park', '127 min', 'Aventura', 'APT', '2023-06-04', 240),
    (5, 'Titanic', '194 min', 'Romance', 'SAM13', '2023-06-05', 477),
    (6, 'El Señor de los Anillos: La Comunidad del Anillo', '178 min', 'Fantasía', 'APT', '2023-06-06', 311),
    (7, 'Matrix', '136 min', 'Ciencia ficción', 'SAM13', '2023-06-07', 312),
    (8, 'Toy Story', '81 min', 'Animación', 'APT', '2023-06-08', 202),
    (9, 'Pulp Fiction', '154 min', 'Crimen', 'SAM13', '2023-06-09', 456),
    (10, 'El Rey León', '88 min', 'Animación', 'APT', '2023-06-10', 387)
    ;`
  );
}

  existe = false;
  sql =
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'proyeccions'";
res = await db.get(sql, []);
if (res.contar > 0) existe = true;
if (!existe) {
  await db.run(
    `CREATE table proyeccions(
         Proy_Codigo INTEGER PRIMARY KEY AUTOINCREMENT, 
         Proy_Fecha text NOT NULL, 
         Proy_Hora text NOT NULL, 
         Proy_NroSala integer NOT NULL,
         Peli_Codigo INTEGER,
         FOREIGN KEY (Peli_Codigo) REFERENCES peliculas(Peli_Codigo)
         );`
  );
  console.log("tabla proyeccions creada!");

  await db.run(
    `insert into proyeccions values	
    (1, '2023-06-01', '09:15', 3, 7),
    (2, '2023-06-02', '14:30', 1, 2),
    (3, '2023-06-03', '18:45', 4, 5),
    (4, '2023-06-04', '12:00', 2, 9),
    (5, '2023-06-05', '07:20', 3, 3),
    (6, '2023-06-06', '16:55', 4, 1),
    (7, '2023-06-07', '10:10', 1, 10),
    (8, '2023-06-08', '19:25', 2, 6),
    (9, '2023-06-09', '13:40', 4, 4),
    (10, '2023-06-10', '01:05', 3, 8)
    ;`
  );
}

  
 

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'tickets'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table tickets( Tick_Id INTEGER PRIMARY KEY AUTOINCREMENT, Tick_FechaVenta text NOT NULL, Cli_DNI integer NOT NULL, But_Fila text NOT NULL, But_Nro text NOT NULL ,Proy_Codigo integer,FOREIGN KEY (Proy_Codigo) REFERENCES proyeccions(Proy_Codigo));"
    );
    console.log("tabla tickets creada!");
    await db.run(
        `insert into tickets values	
        (1, '202-09-01', 12345678, 'B', 25, 5)
      ,(2, '2022-12-01', 98765432, 'C', 12, 3)
      ,(3, '2023-01-01', 56789012, 'D', 37, 7)
      ,(4, '2022-09-16', 54321678, 'A', 9, 1)
      ,(5, '2022-11-17', 87654321, 'E', 43, 10)
      ,(6, '2023-06-20', 90123456, 'B', 19, 2)
      ,(7, '2023-03-13', 34567890, 'E', 30, 8)
      ,(8, '2022-08-26', 23456789, 'C', 14, 6)
      ,(9, '2022-11-27', 65432109, 'A', 6, 4)
      ,(10, '2023-07-04', 78901234, 'D', 48, 9);`
    );
  }


  
  

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
