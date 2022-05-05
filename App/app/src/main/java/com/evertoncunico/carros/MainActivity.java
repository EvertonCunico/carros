package com.evertoncunico.carros;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.evertoncunico.carros.marca.ListarMarcasActivity;
import com.evertoncunico.carros.marca.MarcasActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void abrirCadastroMarcas(View v) {
        startActivity(new Intent(getApplicationContext(), ListarMarcasActivity.class));
    }
}