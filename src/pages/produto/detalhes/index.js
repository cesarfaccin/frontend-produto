import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class produto extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`https://produto2-backend.herokuapp.com/produto/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
        
        return (
            <div className="produto-info">
                <h1> {produto.nome} </h1>
                <h1> {produto.preço} </h1>
                <h1> {produto.quantidadeEmEstoque} </h1>
                <h1> {produto.descrição} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarproduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarproduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}