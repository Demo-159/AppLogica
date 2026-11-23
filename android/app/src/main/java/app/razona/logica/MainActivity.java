package app.razona.logica;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

/**
 * Razona muestra la app web (mapa-camino, sesiones con tutor, práctica, repaso, prueba y simulacro) en un
 * WebView, sin conexión, igual que Ruta B. Las páginas se generan con tools/sesiones/build.py y tools/app/build.py.
 */
public class MainActivity extends BridgeActivity {
    private static final int FONDO = Color.parseColor("#131F24");

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView web = getBridge().getWebView();
        // La voz del tutor avanza sola entre frases, sin exigir un toque por audio
        web.getSettings().setMediaPlaybackRequiresUserGesture(false);
        web.setBackgroundColor(FONDO);
        web.addJavascriptInterface(new Pantalla(), "RazonaAndroid");

        // Barras del sistema oscuras, del color de la app, y la página no queda debajo de ellas
        getWindow().getDecorView().setBackgroundColor(FONDO);
        WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView()).setAppearanceLightStatusBars(false);
        WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView()).setAppearanceLightNavigationBars(false);
        View raiz = (View) web.getParent();
        raiz.setBackgroundColor(FONDO);
        ViewCompat.setOnApplyWindowInsetsListener(raiz, (v, insets) -> {
            Insets b = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            v.setPadding(b.left, b.top, b.right, b.bottom);
            return WindowInsetsCompat.CONSUMED;
        });

        // Atrás: primero cierra lo abierto dentro de la página (ventana de parada, práctica, prueba, aviso);
        // si no hay nada, vuelve a la página anterior (de una sesión, al mapa); si no, sale de la app.
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                web.evaluateJavascript("(window.atras&&window.atras())||false", cerro -> {
                    if ("true".equals(cerro)) return;
                    if (web.canGoBack()) web.goBack();
                    else {
                        setEnabled(false);
                        getOnBackPressedDispatcher().onBackPressed();
                    }
                });
            }
        });
    }

    /** Desde la página: RazonaAndroid.encendida(true) al empezar una sesión con tutor, false en el mapa. */
    private class Pantalla {
        @JavascriptInterface
        public void encendida(boolean si) {
            runOnUiThread(() -> {
                if (si) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            });
        }
    }
}
