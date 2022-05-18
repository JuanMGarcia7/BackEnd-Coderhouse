import passport from "passport";
import LocalStrategy from "passport-local";
import ContenedorMongoDB from "../../contenedores/user/usersMongoDB.js";
import bcryptjs from "bcryptjs";
import Strategy from "passport-local";

const user = new ContenedorMongoDB();

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      const user = await user.findUser({ email: email });
      console.log(user);
      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The Email is already Taken.")
        );
      } else {
        const newUser = new user();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(contraseña);
        console.log(newUser);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      const userBuscado = await user.findUser({ email });
      if (!userBuscado) {
        console.log("NO ESTA!!!");
      }
      /*   REVISARR!!!
    if (
        bcryptjs.compareSync(contraseña.body.contraseña, userBuscado.contraseña)
      ) {
        return done(null, false, console.log("Incorrect Password"));
      } */

      return done(null, userBuscado);
    }
  )
);

passport.serializeUser((userBuscado, done) => {
  console.log("serializeUser");

  done(null, userBuscado[0].email);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser");
  const usuario = await user.findUser(id);
  done(null, usuario);
});

export default passport;
