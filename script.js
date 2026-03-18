*{box-sizing:border-box;}
:root{
  --bg:#0f1115;
  --bg2:#131823;
  --panel:rgba(23,26,33,.94);
  --panel2:#1d2330;
  --text:#edf2fb;
  --muted:#aab5ca;
  --accent:#7aa2ff;
  --accent2:#9ebcff;
  --border:#2c3446;
  --shadow:0 10px 30px rgba(0,0,0,.28);
}
html,body{
  margin:0;
  padding:0;
  background:linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%);
  color:var(--text);
  font-family:Inter,"Segoe UI",system-ui,-apple-system,BlinkMacSystemFont,sans-serif;
}
.container{
  width:min(980px,calc(100% - 32px));
  margin:40px auto;
}
.hero{
  margin-bottom:20px;
}
.hero h1{
  margin:0 0 8px;
  font-size:clamp(2rem,4vw,3rem);
  line-height:1.1;
}
.subtitle{
  margin:0;
  color:var(--muted);
}
.card{
  background:var(--panel);
  border:1px solid var(--border);
  border-radius:18px;
  padding:24px;
  margin-bottom:18px;
  box-shadow:var(--shadow);
  backdrop-filter:blur(10px);
}
.card h2{
  margin:0 0 16px;
  font-size:1.15rem;
}
.grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;
}
.field{
  display:flex;
  flex-direction:column;
  gap:8px;
}
.field label{
  color:var(--muted);
  font-size:.95rem;
}
.field input,.field select{
  width:100%;
  padding:12px 14px;
  background:var(--panel2);
  color:var(--text);
  border:1px solid var(--border);
  border-radius:12px;
  font-size:1rem;
  outline:none;
}
.field input:focus,.field select:focus{
  border-color:var(--accent);
}
.actions{
  display:flex;
  gap:12px;
  margin-top:18px;
}
button{
  border:none;
  border-radius:12px;
  padding:12px 18px;
  background:var(--accent);
  color:#0e1420;
  font-size:1rem;
  font-weight:700;
  cursor:pointer;
  transition:.18s ease;
}
button:hover{
  background:var(--accent2);
  transform:translateY(-1px);
}
button.secondary{
  background:transparent;
  color:var(--text);
  border:1px solid var(--border);
}
button.secondary:hover{
  background:rgba(255,255,255,.04);
}
.results{
  display:grid;
  gap:12px;
}
.result-item{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
  padding:14px 16px;
  border:1px solid var(--border);
  border-radius:14px;
  background:var(--panel2);
}
.result-label{
  color:var(--muted);
}
.result-value{
  font-size:1.05rem;
  font-weight:700;
  text-align:right;
  word-break:break-word;
}
.note-card ul{
  margin:0;
  padding-left:20px;
  color:var(--muted);
  line-height:1.7;
}
@media (max-width:720px){
  .container{
    margin:24px auto;
  }
  .card{
    padding:18px;
  }
  .grid{
    grid-template-columns:1fr;
  }
  .result-item{
    flex-direction:column;
    align-items:flex-start;
    gap:6px;
  }
  .result-value{
    text-align:left;
  }
}
