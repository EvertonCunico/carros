package com.evertoncunico.carros.marca;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.evertoncunico.carros.R;
import com.evertoncunico.carros.marca.Marca;
import com.evertoncunico.carros.marca.MarcaDAO;

public class MarcasActivity extends AppCompatActivity {

    private EditText txtId;
    private EditText editNome;
    private MarcaDAO dao;
    private Marca m = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_marcas);
        this.editNome = findViewById(R.id.editNome);
        this.txtId = findViewById(R.id.editId);
        this.dao = new MarcaDAO(this);

        Intent it = getIntent();

        if (it.hasExtra("marca")) {
            this.m = (Marca) it.getSerializableExtra("marca");
            txtId.setText(m.getId().toString());
            editNome.setText(m.getNome());
        }
    }

    public void salvar(View view) {
        if (this.m == null) {
            this.m = new Marca();
            m.setNome(editNome.getText().toString());
            long id = this.dao.inserir(m);
            Toast.makeText(this, "Registro " + id + " inserido.", Toast.LENGTH_SHORT).show();
        } else {
            m.setNome(editNome.getText().toString());
            this.dao.atualizar(m);
            Toast.makeText(this, "Registro " + m.getId() + " atualizado.", Toast.LENGTH_SHORT).show();
        }

        finish();
    }
}