const fr: object = {
  // token
  token_not_found: 'Token introuvable',
  invalid_token: 'Token invalide',
  // utilisateur & auth
  error_create_user: "Erreur lors de la création de l'utilisateur",
  error_update_user: "Erreur lors de la mise à jour de l'utilisateur",
  user_not_found: 'Utilisateur non trouvé',
  email_already_confirmed: 'Votre adresse e-mail est déjà confirmée',
  email_successfully_confirmed:
    'Votre adresse e-mail a été confirmée avec succès',
  error_confirm_email: "Erreur lors de la confirmation de l'e-mail",
  error_update_lastLoginTime:
    'Erreur lors de la mise à jour de la dernière heure de connexion',
  email_already_exist: `Un compte avec cette adresse e-mail existe déjà`,
  error_login:
    "L'Email et le mot de passe que vous avez saisis ne correspondaient pas à nos enregistrements. Veuillez vérifier et réessayer.",
  email_not_found: `Il n'y a aucun utilisateur avec cet e-mail`,
  error_email_password_not_set:
    "l'email ou le mot de passe ne sont pas définis",
  error_user_without_account: "L'utilisateur n'est lié à aucun account",
  error_password_mismatch: 'Le mot de passe actuel est incorrect',
  error_update_password: 'Erreur lors de la mise à jour du mot de passe',
  error_forgot_password:
    "Erreur lors de l'envoi du lien de réinitialisation du mot de passe",
  // account
  error_create_account: 'Erreur lors de la création du account',
  error_update_account: 'Erreur lors de la mise à jour du account',
  account_not_found: 'Account introuvable',
  account_not_found_by_user: 'Aucun account trouvé pour cet utilisateur',
  // coordinate
  coordinate_not_found: 'Coordonnée introuvable',
  error_create_coordinate:
    "Erreur lors de la création d'une nouvelle coordonnée",
  error_update_coordinate: 'Erreur lors de la mise à jour du coordonnée',
  error_add_coordinate_account:
    "Erreur lors de l'ajout de coordonnée au account",
  error_match_coordinate_with_account:
    "L'ID de la coordonnée ne correspond pas à l'ID du account",
  // compétence
  error_create_skill: 'Erreur lors de la création de la compétence',
  error_update_skill: 'Erreur lors de la mise à jour de la compétence',
  skill_not_found: 'Compétence non trouvée',
  // article
  error_create_article: `Erreur lors de la création d'article`,
  error_update_article: `Erreur lors de la mise à jour d'article`,
  article_not_found: 'Article non trouvé',
  error_duplicate_article: 'Erreur article en double ',
  // address
  error_create_address: "Erreur lors de la création d'une nouvelle adresse",
  error_update_address: "Erreur lors de la mise à jour de l'adresse",
  address_not_found_account: 'aucune adresse trouvée pour ce account',
  address_not_found: 'adresse non trouvée',
  error_add_address_account: "Erreur lors de l'ajout de l'adresse au account",
  error_match_address_with_account:
    "L'ID d'adresse ne correspond pas à lID de account",

  // invitation
  error_create_invitation: "Erreur lors de la création de l'invitation",
  error_update_invitation: "Erreur lors de la mise à jour de l'invitation",
  invitation_not_found: 'Invitation introuvable',
  invitation_not_found_account: 'Aucune invitation trouvée pour ce account',
  invitation_not_found_email: 'Aucune invitation trouvée avec cet e-mail',
  error_match_user_account:
    "Erreur de correspondance entre l'utilisateur et le account",
  error_mismatch_user_account:
    "Erreur de discordance entre l'utilisateur et le account",
  dynamic_template_not_found: 'Modèle dynamique introuvable',
  invalid_invitation: 'Invitations invalides',

  // Properties
  firstName: 'Prénom',
  lastName: 'Nom',
  phoneNumber: 'Numéro de Téléphone',
  email: 'Email',
  Scoring: 'Notation',
  zipcode: 'Code Postal',
  imageUrl: "URL de l'image",
  street: 'Rue',
  regionCode: 'Code de région',
  countryCode: 'Code pays',
  priority: 'Priorité',
  content: 'Contenu',
  name: 'Nom',
  password: 'Mot de passe',
  displayName: "Nom d'affichage",
  legalName: 'Nom légal',
  companySize: 'Taille de la compagnie',
  creationYear: 'Année de création',
  lifeCycle: 'Cycle de vie',
  senderEmail: "Email de l'expéditeur",
  targetEmail: 'Email cible',
};

export default fr;
