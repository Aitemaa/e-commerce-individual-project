const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, City } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({ email, password });
      res
        .status(201)
        .json({ message: `user with email ${newUser.email} has been created` });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmptyEmail" };
      }

      if (!password) {
        throw { name: "EmptyPassword" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !comparePassword(password, user.password)) {
        throw { name: "InvalidUser" };
      }

      const access_token = signToken({ id: user.id });
      res.status(200).send({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { OAuth2Client } = require("google-auth-library");
      const { googleToken } = req.body;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          "696766713892-4ga56n66g0qnmqfihmd2k2v0660d868u.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      console.log(payload, "<<< payload");
      // const userid  =payload['sub'];

      let user = await User.findOne({ where: { email: payload.email } });

      if (!user) {
        user = await User.create(
          {
            email: payload.email,
            password: "iniPassword",
          },
          {
            hooks: false,
          }
        );
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getUserDetails(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: {
          model: City,
        },
      });
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserDetails(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id);
      const { fullName, phoneNumber, address, province, postalCode, CityId } =
        req.body;
      await user.update({
        fullName,
        phoneNumber,
        address,
        province,
        postalCode,
        CityId,
      });
      res.status(200).json({ message: "Your details has been updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
