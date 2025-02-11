export const mockLockers = [
    { lockerCode: "Test-Locker-001", lockerName: "Test Locker 1", "openingTime" : "00:00", "closingTime" : "23:59", city: "Bologna", address: "Bologna Centrale, Piazza delle Medaglie d'Oro, 40121 BO", phone: "123-456-1212", contact: "locker1@gmail.com", latitude: "44.5053881", longitude: "11.3430477"},
    { lockerCode: "Test-Locker-002", lockerName: "Test Locker 2", "openingTime" : "06:00", "closingTime" : "00:00", city: "Bologna", address: "Via G. Grassilli, 11, 40012 Calderara di Reno BO", phone: "375-456-1212", contact: "locker2@gmail.com", latitude: "44.5454", longitude: "11.2576" },
    { lockerCode: "Test-Locker-003", lockerName: "Test Locker 3", "openingTime" : "00:00", "closingTime" : "20:00", city: "Bologna", address: "Bologna Autostazione, 40126 Bologna BO", phone: "485-456-1212", contact: "locker3@gmail.com", latitude: "44.49381", longitude: "11.33875" },
    { lockerCode: "Test-Locker-004", lockerName: "Test Locker 4", "openingTime" : "00:00", "closingTime" : "18:00", city: "Bologna", address: "Largo Respighi, 1, 40126 Bologna BO", phone: "123-456-1212", contact: "locker4@gmail.com", latitude: "44.4938", longitude: "11.3387" },
    { lockerCode: "Test-Locker-005", lockerName: "Test Locker 5", "openingTime" : "08:00", "closingTime" : "23:59", city: "Bologna", address: "Via Irma Bandiera, 15, 40134 Bologna BO", phone: "375-456-1212", contact: "locker5@gmail.com", latitude: "44.4912505", longitude: "11.312043" },
    { lockerCode: "Test-Locker-006", lockerName: "Test Locker 6", "openingTime" : "09:00", "closingTime" : "18:30", city: "Bologna", address: "Via Castiglione, 40124 Bologna BO", phone: "485-456-1212", contact: "locker6@gmail.com", latitude: "44.4853982", longitude: "11.3483018" },
    { lockerCode: "Test-Locker-007", lockerName: "Test Locker 7", "openingTime" : "06:00", "closingTime" : "23:00", city: "Bologna", address: "Via del Triumvirato, 93, 40132 Bologna BO", phone: "123-456-1212", contact: "locker7@gmail.com", latitude: "44.5212293", longitude: "11.2951376" },
    { lockerCode: "Test-Locker-008", lockerName: "Test Locker 8", "openingTime" : "05:00", "closingTime" : "18:00", city: "Bologna", address: "Via De Giovanni, 22, 40129 Bologna BO", phone: "375-456-1212", contact: "locker8@gmail.com", latitude: "44.4918398", longitude: "11.3139654" },
  ];
export const mockDimensions = [
  {lockerCode: "Test-Locker-001", "timePeriod": 1, dimension: "SMALL", price: "300"},
  {lockerCode: "Test-Locker-002", "timePeriod": 1, dimension: "MEDIUM", price: "400"},
  {lockerCode: "Test-Locker-003", "timePeriod": 1, dimension: "LARGE", price: "500"},
  {lockerCode: "Test-Locker-003", "timePeriod": 1, dimension: "MEDIUM", price: "400"},
  {lockerCode: "Test-Locker-003", "timePeriod": 1, dimension: "SMALL", price: "300"},
];

export const mockPromoCode = [
  {lockerCode: "Test-Locker-001", promo: "101010", promoCodePercentage: 10, description: "Sconto del 10%"},
  {lockerCode: "Test-Locker-002", promo: "202020", promoCodePercentage: 20, description: "Sconto del 20%"},
  {lockerCode: "Test-Locker-003", promo: "050505", promoCodePercentage: 5, description: "Sconto del 5%"},
];
export const mockUserBookings = [
  {lockerCode: "Test-Locker-001", bookingId:"1", bookedHours:"1", checkInDate:"2024-04-21T12:00:00", checkOutDate: "2024-04-21T13:00:00",
    bookingConfirmationCode: "78f2c1fa-87fc-4085-b51b-08ad45d875a6", price: "1000", finalPrice: "900", promoCode: "101010", promoCodePercentage: "10",
    box: "01", dimension: "SMALL", onlinePayment: "false", customerFullName: "Test User", customerEmail: "Test.User@testuser.testuser", customerPhoneNumber: "+391234567890",
    unlockIdentifier: "+391234567890", unlockPin: "12345678", paymentComplete: "false", bookingStatus: "active"
  },
  {lockerCode: "Test-Locker-001", bookingId:"2", bookedHours:"1", checkInDate:"2024-04-21T12:00:00", checkOutDate: "2024-04-21T13:00:00",
    bookingConfirmationCode: "78f2c1fa-87fc-4085-b51b-08ad45d875a7", price: "1000", finalPrice: "900", promoCode: "101010", promoCodePercentage: "10",
    box: "02", dimension: "SMALL", onlinePayment: "false", customerFullName: "Test User", customerEmail: "Test.User@testuser.testuser", customerPhoneNumber: "+391234567890",
    unlockIdentifier: "+391234567890", unlockPin: "25789561", paymentComplete: "false", bookingStatus: "active"
  },
];