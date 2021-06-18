import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class Criarproduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                nome: "",
                preço: "",
                quantidadeEmEstoque: "",
                descrição: ""
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="produto-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="preço">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preço"
                                name="preço"
                                placeholder="Preço"
                                required
                                value={this.state.produto.preço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="quantidadeEmEstoque">Quantidade Em Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="quantidadeEmEstoque"
                                name="quantidadeEmEstoque"
                                placeholder="Quantidade em Estoque"
                                required
                                value={this.state.produto.quantidadeEmEstoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="descrição">Descrição </label>
                            <br />
                            <input
                                type="text"
                                id="descrição"
                                name="descrição"
                                placeholder="Descrição"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.descrição}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch('https://produto2-backend.herokuapp.com/produto', {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default Criarproduto;