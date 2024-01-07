const faqBlock = document.getElementById('faqContent')

const faqItems = [
	{
		question: 'May I transfer my ticket to someone else?',
		answer:
			'Yes, you can transfer your ticket to someone else. Please contact us at <a href="mailto:support@example.com">support@example.com</a>.'
	},
	{
		question: 'Why Should I Buy My Ticket Early?',
		answer:
			'Buying your ticket early ensures you secure your spot and often comes with early-bird discounts. Take advantage of the best prices and availability by purchasing early. For specific promotions, contact us at <a href="mailto:sales@example.com">sales@example.com</a>.'
	},
	{
		question: 'Can I Buy Tickets For A Larger Group?',
		answer:
			'Certainly! We welcome group bookings. For information on group discounts and arrangements, please reach out to our group sales team at <a href="mailto:groups@example.com">groups@example.com</a>.'
	},
	{
		question: "How Will I Receive Confirmation Once I've Ordered?",
		answer:
			'Upon completing your order, you will receive a confirmation email with all the details of your purchase. If you encounter any issues or do not receive confirmation, please email us at <a href="mailto:support@example.com">support@example.com</a>.'
	},
	{
		question: "Can I get a refund if I'm unable to attend the summit?",
		answer:
			'Refund policies vary. Please refer to the event terms and conditions on our website for detailed information. If you have specific concerns or need assistance, contact our support team at <a href="mailto:support@example.com">support@example.com</a>.'
	},
	{
		question: 'Is there a mobile app or online platform for the summit?',
		answer:
			"Yes, we provide a mobile app and online platform for a seamless summit experience. You can download the app from your device's app store or access the online platform through our website. Stay connected and make the most of the event!"
	},
	{
		question: 'How can I or my company contribute or partner with the Freedom Summit?',
		answer:
			'We appreciate your interest in contributing or partnering with us! For sponsorship opportunities, please contact our partnership team at <a href="mailto:partnerships@example.com">partnerships@example.com</a>. To explore other ways of contributing, feel free to email us at <a href="mailto:info@example.com">info@example.com</a>.'
	},
	{
		question: 'Will there be live-streaming or recordings of the conference sessions available?',
		answer:
			'Yes, we offer live-streaming of conference sessions as well as recordings for later viewing. Stay tuned for details on how to access these features closer to the event date. For specific inquiries, email us at <a href="mailto:support@example.com">support@example.com</a>.'
	},
	{
		question: 'Will there be food and refreshments provided during the summit?',
		answer:
			'Yes, we will provide food and refreshments during the summit. Enjoy a variety of options to keep you energized throughout the event.'
	},
	{
		question: 'Are there any restrictions on photography or recording during the conference sessions?',
		answer:
			'Yes, there are restrictions on photography or recording during conference sessions. Please adhere to our event guidelines and respect the privacy and intellectual property rights of speakers and attendees.'
	},
	{
		question: 'Will there be an exhibition area where companies can showcase their products or services?',
		answer:
			'No, we do not have an exhibition area for showcasing products or services. However, for partnership and promotional opportunities, please contact our partnership team at <a href="mailto:partnerships@example.com">partnerships@example.com</a>.'
	},
	{
		question: "What if I have a question that isn't answered here?",
		answer:
			'If you have a question that is not addressed here, please feel free to reach out to us at <a href="mailto:ourmail@gmail.com">ourmail@gmail.com</a>. Our team will be happy to assist you!'
	}
]

const faqItemTemplate = document.querySelector('#faqItemTemplate')

for (let faqItem of faqItems) {
	console.log('in faq')
	const clone = faqItemTemplate.content.cloneNode(true)
	clone.querySelector('.faq-item__question').textContent = faqItem.question
	clone.querySelector('.faq-item__answer').innerHTML = faqItem.answer

	faqBlock.appendChild(clone)
}

faqBlock.addEventListener('click', toggleFaqItem)

function toggleFaqItem(e) {
	const faqItem = e.target.closest('.faq-item')
	if (!faqItem) return

	faqItem.classList.toggle('faq-item--is-open')
}
