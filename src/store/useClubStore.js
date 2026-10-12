import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { membershipPlans } from '../content/plans';
import { initialClassSessions } from '../content/classes';

export const DEMO_USERS = [
  {
    id: 'usr-1',
    fullName: 'Azamat Qodirov',
    email: 'azamat@apex.uz',
    phone: '+998 90 123 45 67',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'member',
    accountStatus: 'ACTIVE',
    createdAt: '2024-06-15',
  },
  {
    id: 'usr-2',
    fullName: 'Nilufar Saidova',
    email: 'nilufar@apex.uz',
    phone: '+998 93 987 65 43',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'member',
    accountStatus: 'REGISTERED_NO_SUB',
    createdAt: '2025-02-10',
  },
  {
    id: 'usr-3',
    fullName: 'Temur Mirzayev',
    email: 'temur@apex.uz',
    phone: '+998 97 555 44 33',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    role: 'member',
    accountStatus: 'FROZEN',
    createdAt: '2024-08-01',
  },
  {
    id: 'usr-admin',
    fullName: 'Sardorbek Karimov (Admin)',
    email: 'admin@apexfitness.uz',
    phone: '+998 71 200 44 88',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    accountStatus: 'ACTIVE',
    createdAt: '2023-01-01',
  },
];

const initialSubscriptions = [
  {
    id: 'sub-usr-1',
    userId: 'usr-1',
    planId: 'plan-pro',
    planName: 'PRO FIT',
    billingCycle: 'quarterly',
    pricePaid: 2010000,
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-04-01T23:59:59.000Z',
    status: 'active',
    autoRenew: true,
    weeklyClassLimit: 6,
    remainingFreezeDays: 30,
    freezesUsedThisYear: 0,
  },
  {
    id: 'sub-usr-3',
    userId: 'usr-3',
    planId: 'plan-elite',
    planName: 'VIP ELITE BLACK',
    billingCycle: 'monthly',
    pricePaid: 1290000,
    startDate: '2025-01-15T00:00:00.000Z',
    endDate: '2025-03-15T23:59:59.000Z',
    status: 'frozen',
    autoRenew: false,
    weeklyClassLimit: 99,
    frozenAt: '2025-02-01T00:00:00.000Z',
    frozenUntil: '2025-02-21T00:00:00.000Z',
    remainingFreezeDays: 40,
    freezesUsedThisYear: 1,
  },
];

const initialBookings = [
  {
    id: 'bk-101',
    userId: 'usr-1',
    sessionId: 'cls-101',
    sessionTitle: 'Morning Power Yoga',
    sessionDate: '2025-03-17',
    startTime: '08:00',
    endTime: '09:00',
    trainerName: 'Malika Umarova',
    room: 'Yoga Studiyasi 1',
    status: 'confirmed',
    createdAt: '2025-03-10T10:00:00.000Z',
  },
  {
    id: 'bk-102',
    userId: 'usr-1',
    sessionId: 'cls-102',
    sessionTitle: 'CrossFit WOD: Iron Will',
    sessionDate: '2025-03-17',
    startTime: '10:00',
    endTime: '11:00',
    trainerName: 'Farhod Aliyev',
    room: 'Krossfit Arenasi',
    status: 'confirmed',
    createdAt: '2025-03-11T12:00:00.000Z',
  },
];

const initialMeasurements = [
  { id: 'm-1', userId: 'usr-1', date: '2024-12-01', weight: 84.5, waist: 92, chest: 104, hips: 100, notes: 'Dastlabki tekshiruv' },
  { id: 'm-2', userId: 'usr-1', date: '2025-01-01', weight: 82.8, waist: 90, chest: 105, hips: 99, notes: 'Krossfit boshlandi' },
  { id: 'm-3', userId: 'usr-1', date: '2025-02-01', weight: 81.2, waist: 88, chest: 106, hips: 98, notes: 'Parhezga rioya qilindi' },
  { id: 'm-4', userId: 'usr-1', date: '2025-03-01', weight: 79.5, waist: 85, chest: 107, hips: 97, notes: 'Maksimal qomat relyefi' },
];

const initialWorkouts = [
  { id: 'w-1', userId: 'usr-1', date: '2025-03-10', exercise: "Shtanga bilan cho'qqayish (Squat)", sets: 4, reps: 10, weightKg: 100 },
  { id: 'w-2', userId: 'usr-1', date: '2025-03-10', exercise: "Yotib shtanga ko'tarish (Bench Press)", sets: 4, reps: 8, weightKg: 85 },
  { id: 'w-3', userId: 'usr-1', date: '2025-03-12', exercise: 'Stanovaya tyaga (Deadlift)', sets: 3, reps: 6, weightKg: 130 },
  { id: 'w-4', userId: 'usr-1', date: '2025-03-14', exercise: 'Harbiy bosim (Overhead Press)', sets: 4, reps: 8, weightKg: 55 },
];

const initialInvoices = [
  {
    id: 'inv-9821',
    userId: 'usr-1',
    planName: 'PRO FIT (3 Oylik)',
    amount: 2010000,
    date: '2025-01-01',
    paymentMethod: 'Payme',
    status: 'paid',
  },
];

const initialContactInquiries = [
  {
    id: 'inq-1',
    name: 'Dilshod Rahmatov',
    phone: '+998 90 999 88 77',
    goal: "Vazn tashlash va mushak ko'paytirish",
    message: "Sinov darsiga yozilmoqchiman, dushanba kuni soat 18:00 ga qulay bo'ladimi?",
    date: '2025-03-12',
    status: 'Yangi',
  },
];

export const useClubStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => {
        const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        set({ theme: nextTheme });
      },
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },

      users: DEMO_USERS,
      currentUser: DEMO_USERS[0],
      setCurrentUser: (user) => set({ currentUser: user }),
      switchDemoUser: (userId) => {
        const target = get().users.find((u) => u.id === userId) || null;
        set({ currentUser: target });
        get().addToast({
          type: 'info',
          title: 'Foydalanuvchi almashtirildi',
          message: target ? `${target.fullName} profiliga o'tildi` : "Mehmon rejimi yoqildi",
        });
      },

      // Auth actions
      registerUser: ({ fullName, email, phone }) => {
        const newUser = {
          id: 'usr-' + Date.now(),
          fullName,
          email,
          phone,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
          role: 'member',
          accountStatus: 'REGISTERED_NO_SUB',
          createdAt: new Date().toISOString().split('T')[0],
        };
        set({
          users: [...get().users, newUser],
          currentUser: newUser,
        });
        get().addToast({
          type: 'success',
          title: "Ro'yxatdan muvaffaqiyatli o'tdingiz!",
          message: `Xush kelibsiz, ${fullName}! Endi a'zolik tarifini tanlashingiz mumkin.`,
        });
        return newUser;
      },

      loginUser: (identifier) => {
        const found = get().users.find(
          (u) =>
            u.email.toLowerCase() === identifier.toLowerCase() ||
            u.phone.replace(/\s+/g, '') === identifier.replace(/\s+/g, '')
        );
        if (found) {
          set({ currentUser: found });
          get().addToast({
            type: 'success',
            title: 'Tizimga kirildi',
            message: `${found.fullName} xush kelibsiz!`,
          });
          return true;
        } else {
          // If not found, log in as first user or create guest session
          get().addToast({
            type: 'error',
            title: 'Foydalanuvchi topilmadi',
            message: 'Iltimos, ma\'lumotlarni tekshiring yoki ro\'yxatdan o\'ting',
          });
          return false;
        }
      },

      // Subscriptions
      subscriptions: initialSubscriptions,
      buySubscription: (planId, billingCycle, paymentMethod) => {
        const user = get().currentUser;
        if (!user) {
          get().addToast({
            type: 'error',
            title: 'Tizimga kirish talab qilinadi',
            message: 'Obuna sotib olish uchun iltimos profilga kiring',
          });
          return false;
        }

        const plan = membershipPlans.find((p) => p.id === planId);
        if (!plan) return false;

        let price = plan.priceMonthly;
        let daysToAdd = 30;
        if (billingCycle === 'quarterly') {
          price = plan.priceQuarterly;
          daysToAdd = 90;
        } else if (billingCycle === 'annual') {
          price = plan.priceYearly;
          daysToAdd = 365;
        }

        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

        const newSub = {
          id: 'sub-' + Date.now(),
          userId: user.id,
          planId: plan.id,
          planName: plan.name,
          billingCycle,
          pricePaid: price,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          status: 'active',
          autoRenew: true,
          weeklyClassLimit: plan.weeklyClassLimit,
          remainingFreezeDays: plan.maxFreezeDays,
          freezesUsedThisYear: 0,
        };

        const newInvoice = {
          id: 'inv-' + Math.floor(1000 + Math.random() * 9000),
          userId: user.id,
          planName: `${plan.name} (${billingCycle === 'annual' ? 'Yillik' : billingCycle === 'quarterly' ? '3 oylik' : '1 oylik'})`,
          amount: price,
          date: new Date().toISOString().split('T')[0],
          paymentMethod,
          status: 'paid',
        };

        const otherSubs = get().subscriptions.filter((s) => s.userId !== user.id);

        set({
          subscriptions: [newSub, ...otherSubs],
          invoices: [newInvoice, ...get().invoices],
        });

        get().addToast({
          type: 'success',
          title: 'Obuna muvaffaqiyatli faollashtirildi!',
          message: `${plan.name} tarifi ${paymentMethod} orqali to'landi. APEX klubiga xush kelibsiz!`,
        });

        return true;
      },

      freezeSubscription: (subscriptionId, days) => {
        const sub = get().subscriptions.find((s) => s.id === subscriptionId);
        if (!sub || sub.status !== 'active') return false;
        if (days > sub.remainingFreezeDays) {
          get().addToast({
            type: 'error',
            title: 'Muzlatish limitidan oshib ketdi',
            message: `Sizda faqat ${sub.remainingFreezeDays} kun muzlatish qolgan`,
          });
          return false;
        }

        const now = new Date();
        const until = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

        const updatedSubs = get().subscriptions.map((s) => {
          if (s.id === subscriptionId) {
            return {
              ...s,
              status: 'frozen',
              frozenAt: now.toISOString(),
              frozenUntil: until.toISOString(),
              remainingFreezeDays: s.remainingFreezeDays - days,
              freezesUsedThisYear: s.freezesUsedThisYear + 1,
            };
          }
          return s;
        });

        set({ subscriptions: updatedSubs });
        get().addToast({
          type: 'info',
          title: 'Obuna vaqtincha muzlatildi',
          message: `${days} kunga obuna to'xtatildi. Istalgan vaqtda qayta faollashtirishingiz mumkin.`,
        });
        return true;
      },

      unfreezeSubscription: (subscriptionId) => {
        const sub = get().subscriptions.find((s) => s.id === subscriptionId);
        if (!sub || sub.status !== 'frozen' || !sub.frozenAt) return false;

        const frozenAtTime = new Date(sub.frozenAt).getTime();
        const nowTime = new Date().getTime();
        const daysFrozen = Math.max(1, Math.round((nowTime - frozenAtTime) / (1000 * 60 * 60 * 24)));

        const currentEnd = new Date(sub.endDate).getTime();
        const newEndDate = new Date(currentEnd + daysFrozen * 24 * 60 * 60 * 1000).toISOString();

        const updatedSubs = get().subscriptions.map((s) => {
          if (s.id === subscriptionId) {
            return {
              ...s,
              status: 'active',
              endDate: newEndDate,
              frozenAt: undefined,
              frozenUntil: undefined,
            };
          }
          return s;
        });

        set({ subscriptions: updatedSubs });
        get().addToast({
          type: 'success',
          title: 'Obuna qayta faollashtirildi!',
          message: `Muddatingiz ${daysFrozen} kunga uzaytirildi. Mashg'ulotlarni davom ettiring!`,
        });
        return true;
      },

      // Classes & Bookings
      classes: initialClassSessions,
      bookings: initialBookings,

      bookClass: (sessionId, sessionDate) => {
        const user = get().currentUser;
        if (!user) {
          return { success: false, message: "Mashg'ulotga yozilish uchun tizimga kiring" };
        }

        const userSub = get().subscriptions.find((s) => s.userId === user.id && s.status === 'active');
        if (!userSub && user.role !== 'admin') {
          return {
            success: false,
            message: "Sizda faol a'zolik obunasi yo'q yoki muzlatilgan. Iltimos obunani yangilang.",
          };
        }

        const cls = get().classes.find((c) => c.id === sessionId);
        if (!cls) return { success: false, message: "Mashg'ulot topilmadi" };

        const alreadyBooked = get().bookings.some(
          (b) => b.userId === user.id && b.sessionId === sessionId && b.sessionDate === sessionDate && b.status !== 'cancelled'
        );
        if (alreadyBooked) {
          return { success: false, message: "Siz ushbu darsga allaqachon yozilgansiz!" };
        }

        if (cls.bookedCount >= cls.capacity) {
          return { success: false, message: "Ushbu mashg'ulotda barcha o'rinlar band bo'lgan!" };
        }

        const newBooking = {
          id: 'bk-' + Date.now(),
          userId: user.id,
          sessionId: cls.id,
          sessionTitle: cls.title,
          sessionDate,
          startTime: cls.startTime,
          endTime: cls.endTime,
          trainerName: cls.trainerName,
          room: cls.room,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };

        const updatedClasses = get().classes.map((c) =>
          c.id === sessionId ? { ...c, bookedCount: c.bookedCount + 1 } : c
        );

        set({
          bookings: [newBooking, ...get().bookings],
          classes: updatedClasses,
        });

        get().addToast({
          type: 'success',
          title: 'Darsga muvaffaqiyatli yozildingiz!',
          message: `${cls.title} — ${cls.dayName}, ${cls.startTime} (${cls.room})`,
        });

        return { success: true, message: 'Darsga muvaffaqiyatli yozildingiz!' };
      },

      cancelBooking: (bookingId) => {
        const targetBooking = get().bookings.find((b) => b.id === bookingId);
        if (!targetBooking) return false;

        const updatedBookings = get().bookings.filter((b) => b.id !== bookingId);
        const updatedClasses = get().classes.map((c) =>
          c.id === targetBooking.sessionId ? { ...c, bookedCount: Math.max(0, c.bookedCount - 1) } : c
        );

        set({
          bookings: updatedBookings,
          classes: updatedClasses,
        });

        get().addToast({
          type: 'info',
          title: 'Band qilish bekor qilindi',
          message: `${targetBooking.sessionTitle} darsi bekor qilindi`,
        });

        return true;
      },

      addClass: (newClassData) => {
        const newClass = {
          ...newClassData,
          id: 'cls-' + Date.now(),
          bookedCount: 0,
        };
        set({ classes: [...get().classes, newClass] });
        get().addToast({
          type: 'success',
          title: "Yangi mashg'ulot qo'shildi!",
          message: `${newClass.title} jadvalga kiritildi`,
        });
      },

      deleteClass: (classId) => {
        const target = get().classes.find((c) => c.id === classId);
        set({ classes: get().classes.filter((c) => c.id !== classId) });
        get().addToast({
          type: 'info',
          title: "Mashg'ulot o'chirildi",
          message: target ? `${target.title} jadvaldan olib tashlandi` : '',
        });
      },

      // Contact inquiries
      contactInquiries: initialContactInquiries,
      submitContactInquiry: ({ name, phone, goal, message }) => {
        const newInq = {
          id: 'inq-' + Date.now(),
          name,
          phone,
          goal: goal || "Umumiy so'rov",
          message,
          date: new Date().toISOString().split('T')[0],
          status: 'Yangi',
        };
        set({ contactInquiries: [newInq, ...get().contactInquiries] });
        get().addToast({
          type: 'success',
          title: "So'rovingiz qabul qilindi!",
          message: "Klub menejeri 15 daqiqa ichida siz bilan bog'lanadi.",
        });
        return true;
      },

      // Measurements & Workouts
      measurements: initialMeasurements,
      addMeasurement: (entry) => {
        const user = get().currentUser;
        if (!user) return;
        const newEntry = {
          ...entry,
          id: 'm-' + Date.now(),
          userId: user.id,
        };
        set({ measurements: [...get().measurements, newEntry] });
        get().addToast({
          type: 'success',
          title: "O'lchov saqlandi!",
          message: `Vazn: ${entry.weight} kg (${entry.date})`,
        });
      },

      workoutLogs: initialWorkouts,
      addWorkoutLog: (entry) => {
        const user = get().currentUser;
        if (!user) return;
        const newLog = {
          ...entry,
          id: 'w-' + Date.now(),
          userId: user.id,
        };
        set({ workoutLogs: [newLog, ...get().workoutLogs] });
        get().addToast({
          type: 'success',
          title: "Mashg'ulot qayd etildi!",
          message: `${entry.exercise}: ${entry.sets} x ${entry.reps} (${entry.weightKg} kg)`,
        });
      },

      goal: {
        userId: 'usr-1',
        type: 'muscle_gain',
        startWeight: 84.5,
        targetWeight: 78.0,
        startDate: '2024-12-01',
        targetDate: '2025-06-01',
      },
      setGoal: (goal) => {
        set({ goal });
        get().addToast({
          type: 'success',
          title: 'Maqsad yangilandi!',
          message: `Maqsadli vazn: ${goal.targetWeight} kg`,
        });
      },

      invoices: initialInvoices,

      toasts: [],
      addToast: (toast) => {
        const id = 'tst-' + Date.now() + Math.random().toString(36).substring(2, 6);
        set({ toasts: [...get().toasts, { ...toast, id }] });
        setTimeout(() => {
          get().removeToast(id);
        }, 4000);
      },
      removeToast: (id) => {
        set({ toasts: get().toasts.filter((t) => t.id !== id) });
      },
    }),
    {
      name: 'apex-fitness-storage-v1',
      partialize: (state) => ({
        theme: state.theme,
        users: state.users,
        currentUser: state.currentUser,
        subscriptions: state.subscriptions,
        bookings: state.bookings,
        classes: state.classes,
        measurements: state.measurements,
        workoutLogs: state.workoutLogs,
        invoices: state.invoices,
        goal: state.goal,
        contactInquiries: state.contactInquiries,
      }),
    }
  )
);
