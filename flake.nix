{
  description = "Browser-app development environment using Yarn";

  inputs = {
    nixpkgs.url     = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "yarn-dev";
          buildInputs = [
            pkgs.nodejs_20
            pkgs.yarn
          ];
          shellHook = ''
            export PATH=$PWD/node_modules/.bin:$PATH
          '';
        };
      });
}
