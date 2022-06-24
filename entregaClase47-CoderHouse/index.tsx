// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@17.0.2"
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server"
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/react-dom.d.ts"
import ReactDOM from "https://jspm.dev/react-dom@17.0.2"
// @deno-types="https://deno.land/x/servest@v1.3.4/mod.ts"
import {createApp} from "https://deno.land/x/servest@v1.3.4/mod.ts"

const app = createApp()

let elegirColor: any = []
app.post("/", async (req) => {
   const body = await req.formData()

   const colorElegido = body.value("color")

   elegirColor.push(colorElegido)
})

app.handle("/", async (req) => {
   await req.respond({
      status: 200,
      headers: new Headers({
         "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(
      
         <html>
            <head>
               <meta charSet="utf-8" />
               <title>Entrega clase 47</title>
            </head>
            <body>
               <h1>Servest con deno</h1>
            <form action="/" method="post">

  <div className="form-group">
    <label>Color</label>
    <input type="text" className="form-control" name="color" />
  </div>
  <button type="submit" className="btn btn-primary">Usar este color</button>
</form>
               <ul>
                  {elegirColor.map((c) => {
                     return (
                        <li style={{color: c, listStyleType: "none" }}>
                           {c}
                        </li>
                     )
                  })}
               </ul>
            </body>
         </html>
      ),
   })
})

app.listen({port: 3000})