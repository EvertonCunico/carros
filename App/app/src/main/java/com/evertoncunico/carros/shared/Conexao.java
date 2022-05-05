package com.evertoncunico.carros.shared;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class Conexao extends SQLiteOpenHelper {

    private static final String nomeBanco = "carros.db";
    private static final int version = 1;

    public Conexao(Context context) {
        super(context, nomeBanco, null, version);
    }

    @Override
    public void onCreate(SQLiteDatabase database) {
        database.execSQL(
                "CREATE TABLE marca (" +
                "  id integer primary key autoincrement,\n" +
                "  nome varchar(30)\n" +
                ")");
    }

    @Override
    public void onUpgrade(SQLiteDatabase database, int i, int i1) {

    }
}
