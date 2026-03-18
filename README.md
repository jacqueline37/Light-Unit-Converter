# Light Utility Suite

Light Utility Suite は、光に関する基本的な物理量や、EV・HDR・ACES・IES・Lambert・PBR の目安値をまとめて扱える静的 Web ツールです。

## 主な機能

- **Converter**
  - 光束 `lm`
  - 光度 `cd`
  - 照度 `lx`
  - 輝度 `cd/m² (nit)`
  - `EV100`
  - `Stops`
  - `Exposure Multiplier`
  - `W/m²`
  - `sr`
  の相互換算

- **Camera**
  - Aperture / Shutter / ISO から `EV100` や `lx` の目安を計算

- **EV**
  - 写真・CG向けの EV 計算

- **HDR**
  - nit / EV / Stops / Exposure / lx の変換

- **ACES**
  - Scene Linear 値に対する exposure 変化の確認

- **IES**
  - lumen、distance、solid angle、beam angle から cd / lx を算出

- **Lambert**
  - Lambert 面を仮定した `lx ↔ nit` の補助変換

- **PBR Reference**
  - Moonlight / Room / Office / Sunlight などの参考照度プリセット

---

## このツールでできること

このツールは、**完全な実測器の代わり**ではなく、以下のような用途で使うことを想定しています。

- CGでの光量の目安確認
- 写真・露出・EV の理解
- HDR / ACES ワークフローの補助
- PBR ライティングの基準値の確認
- `lm`, `cd`, `lx`, `nit` の関係整理

---

## 注意点

このツールでは、一部の変換で近似や仮定を使っています。

### 1. `lm ↔ cd`
以下を使用しています。

- `cd = lm / sr`

つまり、**solid angle (sr)** が必要です。

### 2. `cd ↔ lx`
以下を使用しています。

- `lx = cd / d²`

つまり、**distance (m)** が必要です。  
また、法線方向への入射を前提にしています。

### 3. `lx ↔ nit`
以下を使用しています。

- `nit = lx × reflectance / π`

これは **Lambert surface** を仮定した近似です。  
鏡面反射面や自発光面にはそのまま使えません。

### 4. `lx ↔ W/m²`
以下を使用しています。

- `lx = W/m² × efficacy`

デフォルトでは `683 lm/W` を使用しています。  
これは photopic 最大効率に基づく理想値です。

### 5. `EV ↔ lx`
以下の実用近似を使っています。

- `lx ≒ 2.5 × 2^EV`

これは厳密な万能式ではなく、**実務用の目安**です。

---

## Simple / Advanced モード

画面上部でモードを切り替えられます。

### Simple
推奨デフォルト値を使って簡単に試せるモードです。

使用される既定値:

- Distance: `1 m`
- Solid Angle: `2π sr`
- Beam Angle: `180°`
- Reflectance: `0.8`
- Efficacy: `683 lm/W`
- ISO: `100`
- Middle Gray: `0.18`

### Advanced
物理パラメータを自分で指定できるモードです。

- distance
- sr
- beam angle
- reflectance
- efficacy
- ISO
- middle gray

を直接編集できます。

---

## 各タブの使い方

## 1. Converter

任意の入力単位を1つ選び、その値から他の値を計算します。

### 手順
1. `Input Unit` を選ぶ
2. `Value` を入力する
3. 必要なら `Advanced` モードで補助パラメータを調整する
4. `Convert` を押す

### 例
- `1000 lm` を `cd` や `lx` に変換したい
- `500 lx` が `EV100` でどのくらいか見たい
- `1000 nit` がどの程度の `lx` に相当するか目安を見たい

### Preset
Converter にはプリセットがあります。

- Moonlight
- Room
- Office
- Overcast Day
- Sunlight
- HDR1000 Display
- HDR400 Display

参考値をすぐ入力できます。

---

## 2. Camera

カメラ設定から露出の目安を確認するタブです。

### 入力
- Aperture
- Shutter
- ISO
- Reflectance

### 出力
- EV at ISO
- EV100
- lx
- nit
- Stops
- Exposure Multiplier

### Shutter の入力方法
Shutter は次の両方に対応しています。

- 分数: `1/60`, `1/125`
- 秒: `0.0167`, `0.008`

### Shutter Preset
- プリセットを選ぶとシャッター入力欄は固定されます
- `Custom` を選ぶと自由入力できます

---

## 3. EV

EV の確認専用タブです。

### 主な用途
- `f値` と `shutter` から `EV100` を確認
- ISO を考慮した `EV at ISO` を確認
- そこから `lx` や `nit` の目安を知る

### 使用している式
- `EV100 = log2(N² / t)`
- `EVISO = EV100 - log2(ISO / 100)`

ここで
- `N` = aperture
- `t` = shutter time in seconds

です。

---

## 4. HDR

HDR 制作やディスプレイ確認向けの簡易変換です。

### 入力可能な値
- `nit`
- `EV100`
- `Stops`
- `Exposure Multiplier`
- `lx`

### 使いどころ
- HDR1000 の輝度感を確認
- nit ベースで EV の目安を見る
- `Stops` と実際の明るさ感の関係を確認する

---

## 5. ACES

ACES の scene-linear exposure を確認するタブです。

### 入力
- Scene Linear Value
- Stops
- Middle Gray

### 出力
- Input Scene Linear
- Stops
- Exposure Multiplier
- Output Scene Linear
- Relative to Middle Gray
- EV Equivalent

### 主な用途
- `0.18` を基準にした exposure の増減確認
- ACES 系の簡易露出計算
- middle gray に対する相対値の確認

---

## 6. IES

IES 的な考え方で、lumen から candela や lux を見たいときの補助タブです。

### 入力
- Luminous Flux (lm)
- Distance (m)
- Solid Angle (sr)
- Beam Angle (deg)

### 出力
- Luminous Flux
- Luminous Intensity
- Illuminance at Distance
- Solid Angle
- Beam Angle

### 主な用途
- 配光の広さによって同じ lumen でも cd がどう変わるかを見る
- distance で lux がどう落ちるかを確認する

---

## 7. Lambert

Lambert 面を仮定した `lx ↔ nit` の補助タブです。

### 入力
- Value
- Input Type (`lx` または `nit`)
- Reflectance

### 用途
- 拡散反射面を仮定して、照度と輝度のざっくり関係を見る
- 白壁、グレー面、middle gray の目安計算

### 注意
Lambert 仮定なので、以下にはそのまま使えません。

- 鏡面反射
- 金属面
- ディスプレイの発光そのもの
- 複雑な BRDF を持つ面

---

## 8. PBR Reference

参考照度プリセットを選ぶだけで、目安値を見られるタブです。

### プリセット例
- Moonlight
- Dark Interior
- Room
- Office
- Overcast Day
- Sunlight

### 用途
- シーンライティングの初期値決め
- PBR ライトの現実寄り基準確認
- ゲーム / 映像向けのざっくり比較

---

## フォルダ構成

分割版の例です。

```text
index.html
css/
  base.css
  layout.css
  components.css
  utilities.css
js/
  data.js
  dom.js
  utils.js
  ui.js
  converter.js
  camera.js
  hdr.js
  aces.js
  ies.js
  lambert.js
  pbr.js
  main.js
