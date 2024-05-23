# IP-RMT48

module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js",
    env: {
        NODE.ENV: 'production',
        PORT: 90,
        JWT_SECRET:"adadeh"
        RAJAONGKIR_API:'4c6140ce5e8e465ea4a4dee2a24159f4'
        MIDTRANS_SERVER_KEY:SB-Mid-server-Nfmq9DAgduzuV7oLAJec42vG
        PASSWORD_DB_SUPABASE : '9bPJ7n1TcThVjE6F'
        SUPABASE_URI : 'postgres://postgres.bktnplewniapzvencjdc:9bPJ7n1TcThVjE6F@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres'
    }
  }]
}