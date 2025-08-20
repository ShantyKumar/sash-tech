import sql from "mssql";

const sqlConfig: sql.config = {
  user: "sa",
  password: "Cr1TvoWtagVRshb$",
  server: "198.38.81.174",   // ਜਾਂ ਜਿੱਥੇ ਤੇਰਾ SQL Server ਚੱਲ ਰਿਹਾ ਹੈ
  database: "SashTech",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getPool() {
  if (pool) return pool;
  pool = await sql.connect(sqlConfig);
  return pool;
}

export { sql };
