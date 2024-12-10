{pkgs}: {
  deps = [
    pkgs.libxcrypt
    pkgs.postgresql
    pkgs.nodejs-20_x
    pkgs.npm
  ];
}
