export const mockLockers = [
    { lockerCode: "Test-Locker-001", lockerName: "Test Locker 1", openingTime : "00:00", closingTime : "23:59", city: "Bologna", address: "Bologna Centrale, Piazza delle Medaglie d'Oro, 40121 BO", lockerPhone: "123-456-1212", lockerEmail: "locker1@gmail.com", latitude: "44.5053881", longitude: "11.3430477"},
    { lockerCode: "Test-Locker-002", lockerName: "Test Locker 2", openingTime : "06:00", closingTime : "00:00", city: "Bologna", address: "Via G. Grassilli, 11, 40012 Calderara di Reno BO", lockerPhone: "375-456-1212", lockerEmail: "locker2@gmail.com", latitude: "44.5454", longitude: "11.2576" },
    { lockerCode: "Test-Locker-003", lockerName: "Test Locker 3", openingTime : "00:00", closingTime : "20:00", city: "Bologna", address: "Bologna Autostazione, 40126 Bologna BO", lockerPhone: "485-456-1212", lockerEmail: "locker3@gmail.com", latitude: "44.49381", longitude: "11.33875" },
    { lockerCode: "Test-Locker-004", lockerName: "Test Locker 4", openingTime : "00:00", closingTime : "18:00", city: "Bologna", address: "Largo Respighi, 1, 40126 Bologna BO", lockerPhone: "123-456-1212", lockerEmail: "locker4@gmail.com", latitude: "44.4938", longitude: "11.3387" },
    { lockerCode: "Test-Locker-005", lockerName: "Test Locker 5", openingTime : "08:00", closingTime : "23:59", city: "Bologna", address: "Via Irma Bandiera, 15, 40134 Bologna BO", lockerPhone: "375-456-1212", lockerEmail: "locker5@gmail.com", latitude: "44.4912505", longitude: "11.312043" },
    { lockerCode: "Test-Locker-006", lockerName: "Test Locker 6", openingTime : "09:00", closingTime : "18:30", city: "Bologna", address: "Via Castiglione, 40124 Bologna BO", lockerPhone: "485-456-1212", lockerEmail: "locker6@gmail.com", latitude: "44.4853982", longitude: "11.3483018" },
    { lockerCode: "Test-Locker-007", lockerName: "Test Locker 7", openingTime : "06:00", closingTime : "23:00", city: "Bologna", address: "Via del Triumvirato, 93, 40132 Bologna BO", lockerPhone: "123-456-1212", lockerEmail: "locker7@gmail.com", latitude: "44.5212293", longitude: "11.2951376" },
    { lockerCode: "Test-Locker-008", lockerName: "Test Locker 8", openingTime : "05:00", closingTime : "18:00", city: "Bologna", address: "Via De Giovanni, 22, 40129 Bologna BO", lockerPhone: "375-456-1212", lockerEmail: "locker8@gmail.com", latitude: "44.4918398", longitude: "11.3139654" },
  ];
export const mockDimensions = [
  {lockerCode: "Test-Locker-001", timePeriod: 4, dimension: "SMALL", price: 300, qty: 4},
  {lockerCode: "Test-Locker-001", timePeriod: 8, dimension: "SMALL", price: 600, qty: 3},
  {lockerCode: "Test-Locker-001", timePeriod: 12, dimension: "SMALL", price: 900, qty: 2},
  {lockerCode: "Test-Locker-001", timePeriod: 4, dimension: "MEDIUM", price: 400, qty: 3},
  {lockerCode: "Test-Locker-001", timePeriod: 8, dimension: "MEDIUM", price: 800, qty: 3},
  {lockerCode: "Test-Locker-001", timePeriod: 12, dimension: "MEDIUM", price: 1200, qty: 3},
  {lockerCode: "Test-Locker-001", timePeriod: 4, dimension: "LARGE", price: 500, qty: 2}, 
  {lockerCode: "Test-Locker-001", timePeriod: 8, dimension: "LARGE", price: 1000, qty: 2}, 
  {lockerCode: "Test-Locker-001", timePeriod: 12, dimension: "LARGE", price: 1500, qty: 2}, 
  {lockerCode: "Test-Locker-002", timePeriod: 2, dimension: "MEDIUM", price: 400, qty: 3},
  {lockerCode: "Test-Locker-002", timePeriod: 4, dimension: "LARGE", price: 500, qty: 3},
  {lockerCode: "Test-Locker-003", timePeriod: 2, dimension: "LARGE", price: 500, qty: 3},
  {lockerCode: "Test-Locker-003", timePeriod: 2, dimension: "MEDIUM", price: 400, qty: 3},
  {lockerCode: "Test-Locker-003", timePeriod: 2, dimension: "SMALL", price: 300, qty: 3},
];

export const mockPromoCode = [
  {lockerCode: "Test-Locker-001", promo: "101010", promoCodePercentage: 10, description: "Sconto del 10%"},
  {lockerCode: "Test-Locker-002", promo: "202020", promoCodePercentage: 20, description: "Sconto del 20%"},
  {lockerCode: "Test-Locker-003", promo: "050505", promoCodePercentage: 5, description: "Sconto del 5%"},
];
export const mockUserBookings = [
  {lockerCode: "Test-Locker-001", bookingId:1, bookedHours:1, checkInDate:"2025-02-14T08:00:00", checkOutDate: "2025-02-14T15:00:00",
    bookingConfirmationCode: "78f2c1fa-87fc-4085-b51b-08ad45d875a6", price: 300, finalPrice: 270, promoCode: "101010", promoCodePercentage: 10,
    box: "01", dimension: "SMALL", onlinePayment: false, customerFullName: "Test User", customerEmail: "Test.User@testuser.testuser", customerPhoneNumber: "+391234567890",
    unlockIdentifier: "+391234567890", unlockPin: "12345678", paymentComplete: false, bookingStatus: "active"
  },
  {lockerCode: "Test-Locker-001", bookingId:2, bookedHours:1, checkInDate:"2025-02-11T12:00:00", checkOutDate: "2025-02-14T18:00:00",
    bookingConfirmationCode: "78f2c1fa-87fc-4085-b51b-08ad45d875a6", price: 400, finalPrice: 360, promoCode: "101010", promoCodePercentage: 10,
    box: "02", dimension: "MEDIUM", onlinePayment: false, customerFullName: "Test User", customerEmail: "Test.User@testuser.testuser", customerPhoneNumber: "+391234567890",
    unlockIdentifier: "+391234567890", unlockPin: "25789561", paymentComplete: false, bookingStatus: "active"
  },
  {lockerCode: "Test-Locker-002", bookingId:"3", bookedHours:1, checkInDate:"2025-02-11T12:00:00", checkOutDate: "2025-02-11T13:00:00",
    bookingConfirmationCode: "78f2c1fa-87fc-4085-b51b-08ad45d875a8", price: 500, finalPrice: 450, promoCode: "101010", promoCodePercentage: 10,
    box: "03", dimension: "LARGE", onlinePayment: false, customerFullName: "Test User", customerEmail: "Test.User@testuser.testuser", customerPhoneNumber: "+391234567891",
    unlockIdentifier: "+391234567891", unlockPin: "12345679", paymentComplete: false, bookingStatus: "active"
  },
  {lockerCode: "Test-Locker-003", bookingId:"4", bookedHours:1, checkInDate:"2025-02-11T12:00:00", checkOutDate: "2025-02-11T13:00:00",
    bookingConfirmationCode: "78f2c1fa-87fc-4085-b51b-08ad45d875a9", price: 300, finalPrice: 270, promoCode: "101010", promoCodePercentage: 10,
    box: "04", dimension: "SMALL", onlinePayment: false, customerFullName: "Test User", customerEmail: "Test.User@testuser.testuser", customerPhoneNumber: "+391234567891",
    unlockIdentifier: "+391234567891", unlockPin: "78954682", paymentComplete: false, bookingStatus: "active"
  },
];