/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package analiseBanco;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author anderson
 */
public class Table {
    private String name;
    private List<Column> columns;
    private List<Column> tableQueReferenciamEssa;
    private List<Column> essaReferenciaOutraTableFK;
    private List<Column> gatilhosTable;
    private String definitionView;

    //<editor-fold defaultstate="collapsed" desc="GETS & SETS">
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Column> getColumns() {
        if (this.columns == null) {
            this.columns = new ArrayList<Column>();
        }
        return columns;
    }

    public void setColumns(List<Column> columns) {
        this.columns = columns;
    }

    public List<Column> getTableQueReferenciamEssa() {
        if (this.tableQueReferenciamEssa == null) {
            this.tableQueReferenciamEssa = new ArrayList<Column>();
        }
        return tableQueReferenciamEssa;
    }

    public void setTableQueReferenciamEssa(List<Column> tableQueReferenciamEssa) {
        this.tableQueReferenciamEssa = tableQueReferenciamEssa;
    }
    
    public List<Column> getEssaReferenciaOutraTableFK() {
        if (this.essaReferenciaOutraTableFK == null) {
            this.essaReferenciaOutraTableFK = new ArrayList<Column>();
        }
        return essaReferenciaOutraTableFK;
    }

    public void setEssaReferenciaOutraTableFK(List<Column> essaReferenciaOutraTableFK) {
        this.essaReferenciaOutraTableFK = essaReferenciaOutraTableFK;
    }

    public List<Column> getgatilhosTable() {
        if (this.gatilhosTable == null) {
            this.gatilhosTable = new ArrayList<Column>();
        }
        return gatilhosTable;
    }

    public void setgatilhosTable(List<Column> gatilhosTable) {
        this.gatilhosTable = gatilhosTable;
    }

    public String getDefinitionView() {
        return definitionView;
    }

    public void setDefinitionView(String definitionView) {
        this.definitionView = definitionView;
    }
    
    //</editor-fold>
}
