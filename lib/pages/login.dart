import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:frigostock/auth.dart';
// ignore: unused_import
import "login.dart" show Login;

class Login extends StatefulWidget {
  const Login({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  final auth = BaseAuth();
  bool _passwordVisible = false;

//dispose is a function that runs when the widget is removed from the widget tree
  @override
  void dispose() {
    nameController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _passwordVisible = false;
  }

  void forgotpwd() {
    showDialog(
        context: context,
        builder: (context) {
          final dialogContext = context;
          return AlertDialog(
            title: const Text("Mot de passe oublié"),
            content: const Text("Veuillez entrer votre adresse email"),
            actions: <Widget>[
              TextFormField(
                controller: nameController,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: "Veuillez entrer votre adresse email",
                ),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Veuillez entrer votre adresse email';
                  }
                  if (!EmailValidator.validate(value)) {
                    return 'Veuillez entrer une adresse email valide';
                  }
                  return null;
                },
              ),
              ElevatedButton(
                  onPressed: () async {
                    final res = await auth.sendResetPwd(nameController.text);
                    // check if the email is valid or user exist
                    switch (res) {
                      case "OK":
                        return showDialog(
                            context: context,
                            builder: (context) {
                              return AlertDialog(
                                title: const Text(
                                    "Réinitialisation du mot de passe"),
                                content: const Text(
                                    "Veuillez vérifier votre boîte mail"),
                                actions: <Widget>[
                                  ElevatedButton(
                                    child: const Text("OK"),
                                    onPressed: () {
                                      Navigator.of(dialogContext).pop();
                                    },
                                  ),
                                ],
                              );
                            });

                      case "user-not-found":
                        return showDialog(
                            context: context,
                            builder: (context) {
                              return AlertDialog(
                                title: const Text("Erreur"),
                                content:
                                    const Text("L'adresse email n'existe pas"),
                                actions: <Widget>[
                                  ElevatedButton(
                                    child: const Text("OK"),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                ],
                              );
                            });
                      default:
                        showDialog(
                            context: context,
                            builder: (context) {
                              return AlertDialog(
                                title: const Text(
                                    "Réinitialisation du mot de passe"),
                                content: Text(res),
                                actions: <Widget>[
                                  ElevatedButton(
                                    child: const Text("OK"),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                ],
                              );
                            });
                    }
                  },
                  child: const Text("Envoyer"))
            ],
          );
        });
  }

  void submit() {
    // check if the form is valid
    if (_formKey.currentState!.validate()) {
      auth.signIn(nameController.text, passwordController.text).then(
          (value) => Navigator.pop(context),
          onError: (e) => {
                // dialog error
                showDialog(
                    context: context,
                    builder: (context) {
                      final dialogContext = context;
                      return AlertDialog(
                        title: const Text("Erreur"),
                        content:
                            const Text("Veuillez vérifier vos identifiants"),
                        actions: <Widget>[
                          ElevatedButton(
                              onPressed: () {
                                Navigator.pop(dialogContext);
                              },
                              child: const Text("OK"))
                        ],
                      );
                    })
              });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Form(
            key: _formKey,
            child: Column(
              children: [
                // email field
                Padding(
                    padding: const EdgeInsets.all(10),
                    child: TextFormField(
                        controller: nameController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Email',
                        ),
                        validator: (value) {
                          // check if value is empty
                          if (value!.isEmpty) {
                            return 'Veuillez entrer une adresse mail';
                          } else {
                            // check if the email is valid
                            if (!EmailValidator.validate(value)) {
                              return "Veuillez entrer une adresse mail valide";
                            }
                          }

                          return null;
                        })),
                // password field
                Padding(
                    padding: const EdgeInsets.all(10),
                    child: TextFormField(
                        controller: passwordController,
                        obscureText: !_passwordVisible,
                        keyboardType: TextInputType.visiblePassword,
                        decoration: InputDecoration(
                          border: const OutlineInputBorder(),
                          labelText: 'mot de passe',
                          suffixIcon: IconButton(
                            icon: Icon(
                              _passwordVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Theme.of(context).primaryColorDark,
                            ),
                            onPressed: () {
                              setState(() {
                                _passwordVisible = !_passwordVisible;
                              });
                            },
                          ),
                        ),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Veuillez entrer un mot de passe valide';
                          }
                          return null;
                        })),
                TextButton(
                    onPressed: () => forgotpwd(),
                    child: const Text("mot de passe oublier ?")),
                ElevatedButton(
                    onPressed: () => submit(),
                    child: const Text('Se connecter')),
              ],
            )),
      ),
    );
  }
}
