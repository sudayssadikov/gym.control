import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  Flame,
  Droplets,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const CalculatorPage = () => {
  // Tab selector: 'bmi' | 'calories' | 'water'
  const [activeCalc, setActiveCalc] = useState('bmi');

  // BMI state
  const [bmiHeight, setBmiHeight] = useState(175);
  const [bmiWeight, setBmiWeight] = useState(75);

  // Calorie / TDEE state
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(26);
  const [activity, setActivity] = useState(1.55); // Moderate activity
  const [goal, setGoal] = useState('lose'); // 'lose' | 'maintain' | 'gain'

  // Water state
  const [workoutDuration, setWorkoutDuration] = useState(60); // minutes

  // Calculations
  // 1. BMI
  const heightM = bmiHeight / 100;
  const bmiValue = (bmiWeight / (heightM * heightM)).toFixed(1);
  let bmiCategory = 'Normal vazn';
  let bmiColor = 'var(--color-success)';

  if (bmiValue < 18.5) {
    bmiCategory = 'Vazn yetishmovchiligi';
    bmiColor = '#38BDF8';
  } else if (bmiValue < 25) {
    bmiCategory = 'Normal / Sog\'lom vazn';
    bmiColor = 'var(--color-success)';
  } else if (bmiValue < 30) {
    bmiCategory = 'Ortiqcha vazn';
    bmiColor = '#F59E0B';
  } else {
    bmiCategory = 'Semizlik darajasi';
    bmiColor = 'var(--color-error)';
  }

  // 2. BMR & TDEE (Mifflin-St Jeor formula)
  let bmr =
    gender === 'male'
      ? 10 * bmiWeight + 6.25 * bmiHeight - 5 * age + 5
      : 10 * bmiWeight + 6.25 * bmiHeight - 5 * age - 161;
  const tdee = Math.round(bmr * activity);

  let targetCalories = tdee;
  if (goal === 'lose') targetCalories = Math.round(tdee - 500);
  if (goal === 'gain') targetCalories = Math.round(tdee + 400);

  const proteinGrams = Math.round(bmiWeight * (goal === 'gain' ? 2.0 : 1.6));

  // 3. Water Intake (35ml per kg + 12ml per 10 min workout)
  const baseWater = (bmiWeight * 0.035).toFixed(1);
  const workoutExtra = ((workoutDuration / 10) * 0.12).toFixed(1);
  const totalWater = (parseFloat(baseWater) + parseFloat(workoutExtra)).toFixed(1);

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-subtle)',
              marginBottom: '16px',
            }}
          >
            <Calculator size={14} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Ilmiy fitnes va tana hisoblagichi
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Fitnes Kalkulyatori
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            O'z tanangiz parametrlarini tahlil qiling: BMI indeksingiz, kunlik kaloriya me'yori
            va suv ehtiyojini hisoblab, to'g'ri maqsad sari yo'l oling.
          </p>

          {/* Nav Pills */}
          <div
            style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-subtle)',
              gap: '4px',
              marginTop: '24px',
            }}
          >
            <button
              onClick={() => setActiveCalc('bmi')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: activeCalc === 'bmi' ? 700 : 500,
                backgroundColor: activeCalc === 'bmi' ? 'var(--color-accent)' : 'transparent',
                color: activeCalc === 'bmi' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
            >
              <Scale size={16} /> BMI Indeksi
            </button>

            <button
              onClick={() => setActiveCalc('calories')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: activeCalc === 'calories' ? 700 : 500,
                backgroundColor: activeCalc === 'calories' ? 'var(--color-accent)' : 'transparent',
                color: activeCalc === 'calories' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
            >
              <Flame size={16} /> Kunlik Kaloriya (TDEE)
            </button>

            <button
              onClick={() => setActiveCalc('water')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: activeCalc === 'water' ? 700 : 500,
                backgroundColor: activeCalc === 'water' ? 'var(--color-accent)' : 'transparent',
                color: activeCalc === 'water' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
            >
              <Droplets size={16} /> Suv Me'yori
            </button>
          </div>
        </div>

        {/* 1. BMI CALCULATOR */}
        {activeCalc === 'bmi' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>
            {/* Input Controls */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '24px' }}>
                Parametrlarni kiriting
              </h3>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600 }}>Bo'yingiz:</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-accent)', fontSize: '1.125rem' }}>{bmiHeight} sm</span>
                </div>
                <input
                  type="range"
                  min={140}
                  max={220}
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600 }}>Vazningiz:</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-accent)', fontSize: '1.125rem' }}>{bmiWeight} kg</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={160}
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ padding: '16px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                💡 <strong>Eslatma:</strong> BMI — tana massasi indeksi umumiy tana muvozanatini hisoblaydi. Professional sportchilarda mushak massasi yuqori bo'lgani sababli InBody apparatida aniq tahlil qilish tavsiya etiladi.
              </div>
            </div>

            {/* BMI Result Display */}
            <div
              className="glass-panel"
              style={{
                padding: '32px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Sizning Tana Massasi Indeksingiz:
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '4rem',
                    fontWeight: 800,
                    color: bmiColor,
                    lineHeight: 1.1,
                    margin: '12px 0',
                  }}
                >
                  {bmiValue}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: `1px solid ${bmiColor}`,
                    color: bmiColor,
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                  }}
                >
                  {bmiCategory}
                </div>
              </div>

              {/* Recommendation card */}
              <div
                style={{
                  marginTop: '24px',
                  padding: '20px',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px', fontSize: '0.9375rem' }}>
                  Bizning tavsiyamiz:
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                  {bmiValue > 25
                    ? "Sizga haftada 3-4 marta kardio va funksional krossfit darslari hamda dietolog bilan individual ratsion tuzish tavsiya etiladi."
                    : bmiValue < 18.5
                    ? "Sizga mushak massasini oshirish uchun kuch mashg'ulotlari (bodibilding) va kaloriya profitsiti kerak."
                    : "Ajoyib natija! Tonusni saqlash uchun haftada 3 marta trenajyor zali va yoga darslariga qatnashing."}
                </p>
                <Link
                  to="/tariflar"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-accent)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}
                >
                  Mos tarifni tanlash <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. CALORIE & TDEE CALCULATOR */}
        {activeCalc === 'calories' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
                Shaxsiy ma'lumotlar
              </h3>

              {/* Gender selector */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Jinsingiz:</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: gender === 'male' ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
                      color: gender === 'male' ? 'var(--color-accent-contrast)' : 'var(--color-text-primary)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Erkak
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: gender === 'female' ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
                      color: gender === 'female' ? 'var(--color-accent-contrast)' : 'var(--color-text-primary)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Ayol
                  </button>
                </div>
              </div>

              {/* Age */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Yoshingiz:</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>

              {/* Activity Level */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Faollik darajasi:</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <option value={1.2}>Kam harakat (Ofis ishi, mashqsiz)</option>
                  <option value={1.375}>Yengil faol (Haftada 1-3 kun mashq)</option>
                  <option value={1.55}>O'rtacha faol (Haftada 3-5 kun sport)</option>
                  <option value={1.725}>Yuqori faol (Haftada 6-7 kun qizg'in mashq)</option>
                </select>
              </div>

              {/* Goal */}
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Asosiy maqsadingiz:</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <option value="lose">Vazn tashlash (-500 kkal defitsit)</option>
                  <option value="maintain">Vaznni saqlash (Balans)</option>
                  <option value="gain">Mushak massasi yig'ish (+400 kkal)</option>
                </select>
              </div>
            </div>

            {/* Calorie Output */}
            <div
              className="glass-panel"
              style={{
                padding: '32px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Kunlik tavsiya etilgan kaloriya:
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                    lineHeight: 1.1,
                    margin: '12px 0',
                  }}
                >
                  {targetCalories} <span style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>kkal / kun</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Asosiy moddalar almashinuvi (BMR): <strong>{Math.round(bmr)} kkal</strong>
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Kunlik oqsil (protein):</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{proteinGrams} gramm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Haftalik kutilayotgan progress:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>
                    {goal === 'lose' ? '0.4 – 0.6 kg yog\' erishi' : goal === 'gain' ? '0.25 – 0.4 kg mushak' : 'Barqaror tonus'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. WATER CALCULATOR */}
        {activeCalc === 'water' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
                Suv ehtiyojini hisoblash
              </h3>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600 }}>Tana vazningiz:</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-accent)', fontSize: '1.125rem' }}>{bmiWeight} kg</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={140}
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600 }}>Mashg'ulot davomiyligi (kuniga):</span>
                  <span style={{ fontWeight: 800, color: '#38BDF8', fontSize: '1.125rem' }}>{workoutDuration} daqiqa</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={180}
                  step={15}
                  value={workoutDuration}
                  onChange={(e) => setWorkoutDuration(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#38BDF8', cursor: 'pointer' }}
                />
              </div>

              <div style={{ padding: '16px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                💧 APEX zalimizda barcha a'zolar uchun erkin toza mineral suv va muzli kulerlar mavjud.
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '32px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  color: '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Droplets size={32} />
              </div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Kunlik ichish lozim bo'lgan suv:
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  color: '#38BDF8',
                  lineHeight: 1,
                  margin: '12px 0',
                }}
              >
                {totalWater} <span style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}>litr</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', maxWidth: '320px' }}>
                Charchoq, mushak kramplari oldini olish va tana metabolizmini tezlashtirish uchun suvni kun davomida bir tekis taqsimlang.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
