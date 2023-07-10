import * as fs from 'fs';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';


function obterCaminhoAbsoluto(pastaAtual, pastaDestino, nomeArquivo) {
	// Obter o caminho absoluto da pasta atual
	const caminhoPastaAtual = path.resolve(pastaAtual);

	// Obter o caminho absoluto da pasta de destino
	const caminhoPastaDestino = path.resolve(pastaDestino);

	// Combinar o caminho absoluto da pasta de destino com o nome do arquivo
	const caminhoAbsoluto = path.join(caminhoPastaDestino, nomeArquivo);

	return caminhoAbsoluto;
}

// Exemplo de uso




const sqlSchema = new mongoose.Schema({
	conteudo: String,
});

// Criar o modelo SQL

const TABLE = 'backup_banco_api';

export async function salvarArquivoSQL(caminho: string) {
	try {

		// Conectar ao banco de dados MongoDB
		const con = await mongoose.connect(process.env.DATABASE_BACKUP_URL as string);
		const sqlContent = fs.readFileSync(caminho, 'utf-8');
	
		const tableModules = con.connection.collection(TABLE);
		await tableModules.insertOne({
			date: new Date().toString(),
			dump: sqlContent,
		});


		console.log('dumbp salvo com sucesso no MongoDB:');
	} catch (error) {
		console.error('Erro ao salvar o arquivo .sql:', error);
	} finally {
		// Fechar a conexão com o banco de dados
		await mongoose.disconnect();
	}
}


