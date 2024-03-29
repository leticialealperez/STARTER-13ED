import { RetornoTransacoes } from '..';
import { TipoTransacao } from '../../models';
import { TransacoesRepository, UsuariosRepository } from '../../repositories';

type ListarTransacoesDTO = {
	idUsuario: string;
	tipo?: TipoTransacao;
};

export class ListarTransacoes {
	public execute(dados: ListarTransacoesDTO): RetornoTransacoes {
		const { idUsuario, tipo } = dados;

		const repositoryUsuario = new UsuariosRepository();
		const repositoryTransacoes = new TransacoesRepository();

		const usuarioEncontrado =
			repositoryUsuario.buscaUsuarioPorID(idUsuario);

		if (!usuarioEncontrado) {
			return {
				sucesso: false,
				mensagem:
					'Usuário não encontrado. Não foi possível listar as transações.',
				dados: {
					saldo: 0,
				},
			};
		}

		const transacoes = repositoryTransacoes.listarTransacoesDeUmUsuario(
			idUsuario,
			{
				tipo,
			}
		);

		const saldo = repositoryTransacoes.calcularSaldo(idUsuario);

		return {
			sucesso: true,
			mensagem: 'Transações do usuário listadas com sucesso',
			dados: {
				saldo,
				transacoes,
			},
		};
	}
}
