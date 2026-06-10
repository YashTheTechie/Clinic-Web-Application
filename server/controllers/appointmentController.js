// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

// 1. Book Appointment (Patient)
const bookAppointment = async (req, res) => {
  try {
    const { name, phone, email, age, gender, service, date, slot, issue, duration } = req.body;

    // Check slot limit - max 5 appointments per slot per date
    const slotCount = await Appointment.countDocuments({ date, slot });
    if (slotCount >= 5) {
      return res.status(400).json({
        message: `This time slot is fully booked for ${date}. Please select another time slot.`,
      });
    }

    const appointment = await Appointment.create({
      patient: req.patient.id,
      name,
      phone,
      email,
      age,
      gender,
      service,
      date,
      slot,
      issue,
      duration,
    });

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Get All Appointments (Admin)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'fullName email phone')
      .sort({ createdAt: -1 });
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getAllAppointments:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. Get Today Appointments (Admin)
const getTodayAppointments = async (req, res) => {
  try {
    const todayStr = new Date().toLocaleDateString('en-CA');
    
    const appointments = await Appointment.find({ date: todayStr })
      .populate('patient', 'fullName email phone')
      .sort({ slot: 1 });
      
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getTodayAppointments:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. Get Single Appointment Details (Admin)
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'fullName email phone');
      
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error in getAppointmentById:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. Save Prescription (Admin)
const savePrescription = async (req, res) => {
  try {
    const { prescription } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { prescription },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({
      message: 'Prescription saved successfully',
      appointment,
    });
  } catch (error) {
    console.error("Error in savePrescription:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 6. Mark as Attended (Admin)
const markAttended = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'Attended' },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({
      message: 'Appointment marked as attended',
      appointment,
    });
  } catch (error) {
    console.error("Error in markAttended:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 7. Get History - All Attended Appointments (Admin)
const getHistory = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: 'Attended' })
      .populate('patient', 'fullName email phone')
      .sort({ updatedAt: -1 });
      
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getHistory:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 8. Get Single Appointment Details (Patient Side Verification)
const getPatientAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.patient.id,
    });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 9. Get Patient Self Appointments (Patient Dashboard)
const getMyAppointments = async (req, res) => {
  try {
    if (!req.patient || !req.patient.id) {
      return res.status(401).json({ message: 'Unauthorized access tracking' });
    }

    const appointments = await Appointment.find({ patient: req.patient.id })
      .sort({ createdAt: -1 });
      
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getMyAppointments:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const { reason } = req.body;
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.patient.id,
    });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if (appointment.status === 'Attended') {
      return res.status(400).json({ message: 'Cannot cancel an attended appointment' });
    }
    appointment.status = 'Cancelled';
    appointment.cancelReason = reason || 'Cancelled by patient';
    await appointment.save();
    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const rescheduleAppointment = async (req, res) => {
  try {
    const { date, slot } = req.body;
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.patient.id,
    });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if (appointment.status === 'Attended') {
      return res.status(400).json({ message: 'Cannot reschedule an attended appointment' });
    }

    // Check slot limit max 5
    const slotCount = await Appointment.countDocuments({
      date,
      slot,
      _id: { $ne: req.params.id },
    });
    if (slotCount >= 5) {
      return res.status(400).json({
        message: `This time slot is fully booked for ${date}. Please select another slot.`,
      });
    }

    appointment.date = date;
    appointment.slot = slot;
    await appointment.save();
    res.status(200).json({ message: 'Appointment rescheduled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// SINGLE EXPORT FOR ALL METHODS AT THE VERY BOTTOM
module.exports = {
  bookAppointment,
  getAllAppointments,
  getTodayAppointments,
  getAppointmentById,
  savePrescription,
  markAttended,
  getHistory,
  getMyAppointments,
  getPatientAppointmentById,
  cancelAppointment,
  rescheduleAppointment,
};