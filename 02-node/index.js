/* 
0 obter o usurario
1 Obter o numero de telefone de um usuario a partir do seu id
2 Obter o endereco do usuario pelo id
*/
// importamos um modulo interno do nodeJs
const util = require("util");

const obterEnderecoAsync = util.promisify(obterEndereco);

async function obterUsuario() {
	return new Promise(function resolvePromise(resolve, reject) {
		// setTimeout pode ser utilizado para simular o tempo de espera de uma requisição ao BD
		setTimeout(function () {
			return resolve({
				id: 1,
				nome: "José da Silva",
				dataNascimento: new Date(),
			});
		}, 1000);
	});
}

function obterTelefone(idUsuario) {
	return new Promise(function resolvePromise(resolve, reject) {
		setTimeout(function () {
			return resolve({ telefone: "999900", ddd: 81 });
		}, 2000);
	});
}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: "Rua chico jhonson",
			cep: "53633-889",
		});
	}, 2000);
}

// Tornando uma função async ela automaticamente retorna uma promise
main();
async function main() {
	try {
		console.time("promise");
		const usuario = await obterUsuario();
		// const telefone = await obterTelefone(usuario.id);
		// const endereco = await obterEnderecoAsync(usuario.id);

		// Encadear awaits que náo tem dependência causa perca de performance
		// Quando uma promise não depende da outra utilizar Promise.all() pode ser uma solução
		const resultPromises = await Promise.all([
			obterTelefone(usuario.id),
			obterEnderecoAsync(usuario.id),
		]);

		const endereco = resultPromises[1];
		const telefone = resultPromises[0];

		console.log(`
       Nome: ${usuario.nome}
       Endereco: ${endereco.rua}, ${endereco.cep}
       Telefone: (${telefone.ddd}) ${telefone.telefone}
     `);

		console.timeEnd("promise");
	} catch (error) {
		console.error("Houve algum problema !", error);
	}
}

// const userPromise = obterUsuario();

// // para manipular com sucess utilizamos .then
// userPromise
// 	.then(function (usuario) {
// 		return obterTelefone(usuario.id).then(function resolverTelefone(
// 			result,
// 		) {
// 			return {
// 				usuario: { nome: usuario.nome, id: usuario.id },
// 				telefone: result,
// 			};
// 		});
// 	})
// 	.then(function (resultado) {
// 		return obterEndereco(resultado.usuario.id).then(
// 			function resolverEndereco(result) {
// 				return {
// 					...resultado,
// 					endereco: {
// 						rua: result.rua,
// 						cep: result.cep,
// 					},
// 				};
// 			},
// 		);
// 	})
// 	.then(function (resultado) {
// 		console.log("resultado", resultado);
// 		console.log(`
//       Nome: ${resultado.usuario.nome}
//       Endereco: ${resultado.endereco.rua}, ${resultado.endereco.cep}
//       Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//     `);
// 	})
// 	// para manipular error utilizamos .catch
// 	.catch(function (error) {
// 		console.error("Houve alguma problema", error);
// 	});
