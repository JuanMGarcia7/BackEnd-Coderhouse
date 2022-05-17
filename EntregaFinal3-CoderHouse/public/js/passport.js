import passport from "passport";
import LocalStrategy from "passport-local";
import ContenedorMongoDB from "../../contenedores/user/usersMongoDB.js";
import bcryptjs from "bcryptjs";

const user = new ContenedorMongoDB();
passport.serializeUser((userBuscado, done) => {
  done(null, userBuscado[0].email);
});

passport.deserializeUser(async (email, done) => {
  const usuario = await user.findUser({ email });
  done(null, usuario);
});

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
      /*  if (
        bcryptjs.compareSync(contraseña.body.contraseña, userBuscado.contraseña)
      ) {
        return done(null, false, console.log("Incorrect Password"));
      } */

      return done(null, userBuscado);
    }
  )
);

export default passport;
