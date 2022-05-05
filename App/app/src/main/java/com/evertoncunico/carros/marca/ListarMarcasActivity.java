package com.evertoncunico.carros.marca;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;

import com.evertoncunico.carros.R;

import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class ListarMarcasActivity extends AppCompatActivity {

    private ListView listView;
    private EditText edtPesquisa;
    private MarcaDAO dao;
    private SQLiteDatabase sqLiteDatabase;
    private List<Marca> marcas;
    private List<Marca> marcasFiltrado = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listar_marcas);

        this.listView = findViewById(R.id.lista_marcas);
        this.edtPesquisa = findViewById(R.id.editPesquisa);
        this.dao = new MarcaDAO(this);
        this.carregar();

        ArrayAdapter<Marca> adt = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, marcasFiltrado);
        this.listView.setAdapter(adt);
        registerForContextMenu(listView);

        this.edtPesquisa.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if (charSequence != null) {
                    filtrar(charSequence.toString());
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
    }

    private void carregar() {
        this.marcas = this.dao.listarMarcas();

        this.marcasFiltrado.clear();
        this.marcasFiltrado.addAll(this.marcas);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater i = new MenuInflater(this);
        i.inflate(R.menu.menu_principal_marcas, menu);

        return true;
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        MenuInflater mi = getMenuInflater();
        mi.inflate(R.menu.menu_contexto_marcas, menu);
    }

    public void filtrar(String texto) {
        marcasFiltrado.clear();
        marcasFiltrado.addAll(
                marcas.stream().filter(i -> i.getNome().toLowerCase(Locale.ROOT)
                        .contains(texto.toLowerCase(Locale.ROOT)))
                        .collect(Collectors.toList()));
        this.listView.invalidateViews();
    }

    public void cadastrar(MenuItem menuItem) {
        startActivity(new Intent(getApplicationContext(), MarcasActivity.class));
    }

    public void excluir (MenuItem menuItem) {
        AdapterView.AdapterContextMenuInfo menuInfo = (AdapterView.AdapterContextMenuInfo) menuItem.getMenuInfo();

        final Marca m = this.marcasFiltrado.get(menuInfo.position);

        AlertDialog dialog = new AlertDialog.Builder(this)
                .setTitle("Atenção")
                .setMessage("Deseja realmente excluir o registro?")
                .setNegativeButton("Não", null)
                .setPositiveButton("Sim", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        marcas.remove(m);
                        marcasFiltrado.remove(m);
                        dao.excluir(m);
                        listView.invalidateViews();
                    }
                }).create();

        dialog.show();
    }

    public void atualizar (MenuItem menuItem) {
        AdapterView.AdapterContextMenuInfo menuInfo = (AdapterView.AdapterContextMenuInfo) menuItem.getMenuInfo();

        final Marca m = this.marcasFiltrado.get(menuInfo.position);

        Intent i = new Intent(this, MarcasActivity.class);
        i.putExtra("marca", m);
        startActivity(i);
    }

    @Override
    protected void onResume() {
        super.onResume();
        this.carregar();
        this.listView.invalidateViews();
    }
}