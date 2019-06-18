/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package analiseBanco;

/**
 *
 * @author anderson
 */
public class Column {
    private String name;
    private String tipoDados;
    private boolean nullable;
    private String _default;
    private String nomeTableReferencia;
    private String nomeColumnReferencia;
    private String descricao;
    
    private String timing;
    private String manipulation;

    //<editor-fold defaultstate="collapsed" desc="GETS & SETS">
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTipoDados() {
        return tipoDados;
    }

    public void setTipoDados(String tipoDados) {
        this.tipoDados = tipoDados;
    }

    public boolean isNullable() {
        return nullable;
    }

    public void setNullable(boolean nullable) {
        this.nullable = nullable;
    }

    public String getDefault() {
        return _default;
    }

    public void setDefault(String _default) {
        this._default = _default;
    }
    
    public String getNomeTableReferencia() {
        return nomeTableReferencia;
    }

    public void setNomeTableReferencia(String nomeTableReferencia) {
        this.nomeTableReferencia = nomeTableReferencia;
    }

    public String getNomeColumnReferencia() {
        return nomeColumnReferencia;
    }

    public void setNomeColumnReferencia(String nomeColumnReferencia) {
        this.nomeColumnReferencia = nomeColumnReferencia;
    }

    public String getTiming() {
        return timing;
    }

    public void setTiming(String timing) {
        this.timing = timing;
    }

    public String getManipulation() {
        return manipulation;
    }

    public void setManipulation(String manipulation) {
        this.manipulation = manipulation;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    //</editor-fold>
    
}
