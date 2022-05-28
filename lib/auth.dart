import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';

// ignore: unused_import
import "auth.dart" show BaseAuth;

class BaseAuth {
  final FirebaseAuth auth = FirebaseAuth.instance;

  Future<User?> signIn(String email, String password) async {
    await auth
        .signInWithEmailAndPassword(
          email: email,
          password: password,
        )
        .then((value) => value.user)
        .catchError((e) => e);
    return null;
  }

  Future<User?> signUp(String email, String password) async {
    await auth
        .createUserWithEmailAndPassword(
          email: email,
          password: password,
        )
        .then((res) => res.user, onError: (e) => e);
    return null;
  }

  Future<String> sendResetPwd(String email) async {
    try {
      await FirebaseAuth.instance.setLanguageCode("fr");
      await FirebaseAuth.instance.sendPasswordResetEmail(email: email);
      return "OK";
    } on FirebaseAuthException catch (e) {
      return e.code;
    }
  }
}
