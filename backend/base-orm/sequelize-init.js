// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/cine.db");

// definicion del modelo de datos
//PELICULAS
const peliculas = sequelize.define(
  "peliculas",
  {
    Peli_Codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Peli_Titulo: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Titulo es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Titulo debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },
    Peli_Duracion: {
        // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Duracion es requerida",
          },
          len: {
            args: [5, 10],
            msg: "Duracion debe ser tipo carateres, entre 5 y 10 de longitud",
          },
        },
      },
    Peli_Genero: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Genero es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Titulo debe ser tipo carateres, entre 5 y 30 de longitud",
        },
      },
    },

    Peli_Clase: {
        // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Clase es requerida",
          },
          len: {
            args: [3, 10],
            msg: "Clase debe ser tipo carateres, entre 5 y 10 de longitud",
          },
        },
      },
    
    Peli_FechaLanzamiento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha Lanzamiento es requerido",
          }
        }
    },

    Peli_CantVisualizaciones: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Peli_Codigo es requerido",
        }
      }
    },
  },
  
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (pelicula, options) {
        if (typeof pelicula.Peli_Titulo === "string") {
            pelicula.Peli_Titulo = pelicula.Peli_Titulo.toUpperCase().trim();
        }
        if (typeof pelicula.Peli_Genero === "string") {
            pelicula.Peli_Genero = pelicula.Peli_Genero.toUpperCase().trim();
        }
        if (typeof pelicula.Peli_Duracion === "string") {
            pelicula.Peli_Duracion = pelicula.Peli_Duracion.trim();
        }
        if (typeof pelicula.Peli_Clase === "string") {
            pelicula.Peli_Clase = pelicula.Peli_Clase.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

//PROYECCIONES
const proyeccions = sequelize.define(
    "proyeccions",
    {
      Proy_Codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Proy_Fecha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha Proyeccion es requerido",
        }
      },
    },
    Proy_Hora: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "La Hora es requerida",
          },
          len: {
            args: [5, 6],
            msg: "La Hora debe tener un formato 00:00",
          },
        },
      },
    Proy_NroSala: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Numero de Sala es requerido",
          },
          is: {
            args: ["^[1-4]$", "i"],
            msg: "Numero de Sala debe ser numerico con valores entre el 1 y 4",
          },
        },
      },
      Peli_Codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Peli_Codigo es requerido",
          }
        }
      },
      
    },
    {
      // pasar a mayusculas
      hooks: {
        beforeValidate: function (proyeccion, options) {
          if (typeof proyeccion.Proy_Hora === "string") {
            proyeccion.Proy_Hora = proyeccion.Proy_Hora.trim();
          }
        },
      },
  
      timestamps: false,
    }
    
  );
  //TICKETS 
  const tickets = sequelize.define(
    "tickets",
    {
      Tick_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Tick_FechaVenta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha Venta es requerido",
        }
      },
    },
    Cli_DNI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "DNI es requerido",
        },
        isNumeric: {
          args: true,
          msg: "DNI debe ser numérico",
        },
        len: {
          args: [8, 8],
          msg: "DNI debe tener exactamente 8 dígitos",
        },
      },
    },
    But_Fila: {
        type: DataTypes.STRING(1),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fila de Butaca es requerida",
          },
          len: {
            args: [1],
            msg: "Fila de Butaca solo debe tener un unico caracter",
          },
        },
      },
      But_Nro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Numero de Butaca es requerido",
          },
          is: {
            args: [/^[1-9]|[1-4][0-9]|50$/],
            msg: "Numero de Butaca solo debe se del 1 al 50",
          },
        },
      },
      
      Proy_Codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Proy_Codigo es requerido",
          }
        }
      },
    },
    {
      // pasar a mayusculas
      hooks: {
        beforeValidate: function (ticket, options) {
          if (typeof ticket.But_Fila === "string") {
            ticket.But_Fila = ticket.But_Fila.toUpperCase().trim();
          }
        },
      },
  
      timestamps: false,
    }  
    
);


module.exports = {
  sequelize,
  peliculas,
  proyeccions,
  tickets,
};
