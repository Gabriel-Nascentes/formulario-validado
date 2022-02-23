class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        });

    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.checkFields();
        const senhasValidas = this.checkPassword();

        if(camposValidos && senhasValidas){
            alert('Formulario enviado.');
            this.formulario.submit();
        }
    }

    checkPassword(){
        let valid = true;
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
            this.createErro(repetirSenha, 'Campos senha e repetir senha precisa ser iguais.')
            valid = false;
        }
        if(senha.value.length < 6 || senha.value.length > 12){
            this.createErro(senha, 'A senha precisa ter entre 6 e 12 caracteres.');
            valid = false;
        }
        return valid;
    }

    checkFields(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            let label = campo.previousElementSibling.innerText;

            if(!campo.value){
                this.createErro (campo, `Campo "${label}" não pode estar em branco.`);
                valid = false;
            }

            if(campo.classList.contains('cpf')){
                if(!this.ValidaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }
            
        return valid;            
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;
        
        if(usuario.length < 3 || usuario.length > 12){
            this.createErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.createErro(campo, 'Nome de usuário precisa conter apenas letras e/ou números.');
            valid = false;
        }
        return true;
    }

    ValidaCPF(campo){
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.createErro(campo, 'CPF inválido');
        }
        return true;
    }

    createErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}
const valida = new ValidaFormulario();