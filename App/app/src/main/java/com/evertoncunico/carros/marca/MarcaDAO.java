package com.evertoncunico.carros.marca;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.evertoncunico.carros.shared.Conexao;

import java.util.ArrayList;
import java.util.List;

public class MarcaDAO {

    public Conexao conexao;
    public SQLiteDatabase db;

    public MarcaDAO(Context context) {
        this.conexao = new Conexao(context);
        this.db = conexao.getWritableDatabase();
    }

    public long inserir (Marca marca) {
        ContentValues values = new ContentValues();
        values.put("nome", marca.getNome());
        return db.insert("marca", null, values);
    }

    public List<Marca> listarMarcas () {
        List<Marca> result = new ArrayList<>();
        Cursor c = db.query("marca", new String[] { "id", "nome"}, null, null, null, null, null);
        while (c.moveToNext()) {
            result.add(new Marca(c.getInt(0), c.getString(1)));
        }
        return result;
    }

    public void atualizar (Marca marca) {
        ContentValues values = new ContentValues();
        values.put("nome", marca.getNome());
        db.update("marca", values, "id = ?", new String[] {marca.getId().toString()});
    }

    public void excluir (Marca marca) {
        this.db.delete("marca", "id = ?", new String[] {marca.getId().toString()});
    }
}
