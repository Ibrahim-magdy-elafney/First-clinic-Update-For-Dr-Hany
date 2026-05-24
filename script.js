const form = document.getElementById("form");
const result = document.getElementById("result");
const total = document.getElementById("total");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const messageField = document.getElementById("message").value.trim();

    // ✅ مهم: لازم يكون id = service في HTML
    const service = document.getElementById("service");

    if (!service) {
        alert("في مشكلة في اختيار الخدمة (id غلط)");
        return;
    }

    const price = Number(service.value);
    const serviceText = service.options[service.selectedIndex].text;

    const date1 = document.querySelectorAll(".date")[0].value;
    const time1 = document.querySelectorAll(".time")[0].value;

    // validation
    if (!name || !phoneNumber || !date1 || !time1) {
        result.style.color = "red";
        result.innerText = "من فضلك املي البيانات الأساسية";
        return;
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!phoneRegex.test(phoneNumber)) {
        result.style.color = "red";
        result.innerText = "رقم موبايل غير صحيح";
        return;
    }

    total.innerText = `السعر التقريبي: ${price.toLocaleString()} جنيه`;

    result.style.color = "green";
    result.innerText = "تم الحجز بنجاح 🎉";

    const patientMessage = `🦷 تم تسجيل حجزك بنجاح

👤 الاسم: ${name}
🦷 الخدمة: ${serviceText}
💰 السعر: ${price.toLocaleString()} جنيه

🚨 توجه للعيادة لاستلام رقم الدور من السكرتارية`;

    const clinicMessage = `📢 حجز جديد

👤 الاسم: ${name}
📞 الهاتف: ${phoneNumber}
🦷 الخدمة: ${serviceText}
💰 السعر: ${price.toLocaleString()} جنيه

⚠️بعد اذنك يا غالي تنورنا علشان تعرف دورك`;

    const clinicPhone = "201080407065";

    window.open(
        `https://wa.me/${clinicPhone}?text=${encodeURIComponent(clinicMessage)}`,
        "_blank"
    );

    setTimeout(() => {
        window.open(
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(patientMessage)}`,
            "_blank"
        );
    }, 1000);
});