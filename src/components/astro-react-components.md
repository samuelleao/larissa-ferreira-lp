# React (design system) em ficheiros `.astro`

## Botão com destino em âncora (`<a>`)

Para um `Button` do design system que deve navegar como link (por exemplo `#secção` ou URL externa), **não** uses a prop `render` do Base UI nem `createElement` no frontmatter do Astro: o parser do `.astro` não aceita JSX dentro de atributos e o padrão fica difícil de ler.

Usa um `<a>` à volta do `Button` e `nativeButton={false}`:

```astro
---
import { Button } from "@/components/ui/button"
---

<a href="#marcar-consulta" class="inline-flex shrink-0 no-underline">
  <Button client:load variant="default" size="lg" nativeButton={false}>
    Marcar consulta
  </Button>
</a>
```

### Regras deste projeto

1. **`client:load` (ou outra diretiva `client:*` adequada)** no `Button` — é um componente React; sem isto não há hidratação e o comportamento do Base UI fica incompleto.
2. **`nativeButton={false}`** — indica ao Base UI que o elemento final não é um `<button>` nativo (o anfitrião é o link). Mantém a convenção alinhada com a documentação do Base UI para composição com `render` ou aninhamento semântico.
3. **Estilos no `<a>`** — usa classes mínimas no link (`inline-flex`, `no-underline`, etc.) para o layout no pai e para o aspeto do hiperligação; o aspeto do “botão” continua a vir das variantes do `Button`.
4. **Evitar** `render={createElement(...)}` ou `render={<a />}` dentro de atributos em `.astro` — frágil ou inválido no parser; o padrão acima é o padrão a seguir.

Referência em código: `menu.astro` (CTA “Marcar consulta”).
